import pandas as pd
import joblib

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from xgboost import XGBRegressor

# Load dataset
df = pd.read_csv("../data/archive/Train_Data.csv")

X = df.drop("charges", axis=1)
y = df["charges"]

categorical = ["sex","smoker","region"]
numeric = ["age","bmi","children"]

preprocessor = ColumnTransformer(
    [
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical),
        ("num", "passthrough", numeric),
    ]
)

model = XGBRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=5,
    random_state=42
)

pipeline = Pipeline([
    ("prep", preprocessor),
    ("model", model)
])

X_train,X_test,y_train,y_test=train_test_split(
    X,y,test_size=0.2,random_state=42
)

pipeline.fit(X_train,y_train)

pred=pipeline.predict(X_test)

print("MAE:",mean_absolute_error(y_test,pred))
print("R2 :",r2_score(y_test,pred))

joblib.dump(pipeline,"../models/insurance_model.pkl")

print("Insurance model saved.")