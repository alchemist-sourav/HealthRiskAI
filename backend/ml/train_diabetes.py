from pathlib import Path
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
from xgboost import XGBClassifier

BASE_DIR = Path(__file__).resolve().parent.parent

df = pd.read_csv(BASE_DIR / "data" / "diabetes" / "diabetes.csv")

import numpy as np

# Replace zeros in medical measurements with NaN
cols = ["Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI"]
df[cols] = df[cols].replace(0, np.nan)

# Fill missing values with median
df = df.fillna(df.median(numeric_only=True))

X = df.drop("Outcome", axis=1)
y = df["Outcome"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = XGBClassifier(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=5,
    random_state=42,
    eval_metric="logloss"
)

model.fit(X_train, y_train)

pred = model.predict(X_test)
prob = model.predict_proba(X_test)[:, 1]

print("=" * 50)
print("Diabetes Model Results")
print("=" * 50)
print("Accuracy :", accuracy_score(y_test, pred))
print("ROC AUC  :", roc_auc_score(y_test, prob))
print()
print(classification_report(y_test, pred))

joblib.dump(model, BASE_DIR / "models" / "diabetes_model.pkl")

print("\n✅ diabetes_model.pkl saved successfully")