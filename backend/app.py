from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
from pathlib import Path
from routes.dashboard import router as dashboard_router

app = FastAPI(title="HealthRisk AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
insurance_model = joblib.load(BASE_DIR / "models" / "insurance_model.pkl")
heart_model = joblib.load(BASE_DIR / "models" / "heart_model.pkl")
diabetes_model = joblib.load(BASE_DIR / "models" / "diabetes_model.pkl")


class InsuranceInput(BaseModel):
    age: int
    sex: str
    bmi: float
    children: int
    smoker: str
    region: str


class HeartInput(BaseModel):
    age: float
    sex: int
    cp: int
    trestbps: float
    chol: float
    fbs: int
    restecg: int
    thalach: float
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int


class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int


@app.get("/")
def root():
    return {
        "message": "HealthRisk AI Backend Running"
    }


@app.post("/predict/insurance")
def predict_insurance(data: InsuranceInput):

    df = pd.DataFrame([data.dict()])

    prediction = insurance_model.predict(df)[0]

    return {
        "predicted_charges": round(float(prediction), 2)
    }


@app.post("/predict/heart")
def predict_heart(data: HeartInput):

    df = pd.DataFrame([data.dict()])

    probability = heart_model.predict_proba(df)[0][1]
    prediction = heart_model.predict(df)[0]

    return {
        "heart_disease": bool(prediction),
        "risk_probability": round(float(probability), 4),
        "risk_level": (
            "High"
            if probability >= 0.7
            else "Medium"
            if probability >= 0.4
            else "Low"
        )
    }


@app.post("/predict/diabetes")
def predict_diabetes(data: DiabetesInput):

    df = pd.DataFrame([data.dict()])

    probability = diabetes_model.predict_proba(df)[0][1]
    prediction = diabetes_model.predict(df)[0]

    return {
        "diabetes_risk": bool(prediction),
        "risk_probability": round(float(probability), 4),
        "risk_level": (
            "High"
            if probability >= 0.7
            else "Medium"
            if probability >= 0.4
            else "Low"
        )
    }

app.include_router(dashboard_router)
