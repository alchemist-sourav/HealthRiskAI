# API Documentation

The HealthRisk AI backend exposes a RESTful API powered by FastAPI. 
You can view the interactive Swagger UI by running the backend and navigating to `http://127.0.0.1:8000/docs`.

## Base URL
`http://127.0.0.1:8000`

---

## 1. Heart Disease Prediction
Predicts the likelihood of cardiovascular disease based on clinical metrics.

**Endpoint:** `POST /predict/heart`

**Request Body (JSON):**
```json
{
  "age": 55,
  "sex": 1,
  "cp": 2,
  "trestbps": 140,
  "chol": 240,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 1.5,
  "slope": 1,
  "ca": 0,
  "thal": 2
}
```

**Response (JSON):**
```json
{
  "prediction": 1,
  "probability": 0.85,
  "risk_level": "High Risk"
}
```

---

## 2. Diabetes Risk Prediction
Predicts the likelihood of developing type 2 diabetes.

**Endpoint:** `POST /predict/diabetes`

**Request Body (JSON):**
```json
{
  "pregnancies": 2,
  "glucose": 135,
  "blood_pressure": 80,
  "skin_thickness": 30,
  "insulin": 120,
  "bmi": 28.5,
  "diabetes_pedigree": 0.45,
  "age": 42
}
```

**Response (JSON):**
```json
{
  "prediction": 1,
  "probability": 0.65,
  "risk_level": "Moderate Risk"
}
```

---

## 3. Insurance Premium Estimation
Estimates annual medical insurance charges using regression analysis.

**Endpoint:** `POST /predict/insurance`

**Request Body (JSON):**
```json
{
  "age": 35,
  "sex": 0,
  "bmi": 24.5,
  "children": 1,
  "smoker": 0,
  "region": 1
}
```

**Response (JSON):**
```json
{
  "estimated_charges": 5420.50
}
```

---

## 4. System Status
Check if the API is running.

**Endpoint:** `GET /`

**Response (JSON):**
```json
{
  "status": "online",
  "message": "HealthRisk AI API is running."
}
```
