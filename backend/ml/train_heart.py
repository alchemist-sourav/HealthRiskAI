from pathlib import Path
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, roc_auc_score
from xgboost import XGBClassifier

BASE_DIR = Path(__file__).resolve().parent.parent

columns = [
    "age","sex","cp","trestbps","chol","fbs","restecg",
    "thalach","exang","oldpeak","slope","ca","thal","target"
]

df = pd.read_csv(
    BASE_DIR / "data" / "heart+disease" / "processed.cleveland.data",
    names=columns
)

# Replace missing values
df.replace("?", pd.NA, inplace=True)
df.dropna(inplace=True)

# Convert all columns to numeric
for col in df.columns:
    df[col] = pd.to_numeric(df[col])

# Binary classification
df["target"] = (df["target"] > 0).astype(int)

X = df.drop("target", axis=1)
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    stratify=y,
    random_state=42
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
print("Heart Disease Model Results")
print("=" * 50)
print("Accuracy :", accuracy_score(y_test, pred))
print("ROC AUC  :", roc_auc_score(y_test, prob))
print()
print(classification_report(y_test, pred))

joblib.dump(model, BASE_DIR / "models" / "heart_model.pkl")

print("\n✅ heart_model.pkl saved successfully")