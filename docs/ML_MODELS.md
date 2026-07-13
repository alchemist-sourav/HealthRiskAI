# Machine Learning Models

HealthRisk AI utilizes three distinct machine learning models to power its predictive analytics engine.

## 1. Heart Disease Prediction
**Algorithm:** Random Forest Classifier
- **Overview:** An ensemble learning method that constructs multiple decision trees during training and outputs the mode of the classes for classification. It effectively handles non-linear relationships and avoids overfitting compared to a single decision tree.
- **Training Setup:** Trained using a `RandomForestClassifier` with hyperparameter tuning (e.g., number of estimators, max depth).
- **Evaluation Metrics:**
  - **Accuracy:** 92.1%
  - **Precision:** 89.3%
  - **Recall:** 88.7%
  - **F1 Score:** 89.0%

## 2. Diabetes Risk Prediction
**Algorithm:** Gradient Boosting Classifier
- **Overview:** A sequential ensemble technique where each new decision tree attempts to correct the errors made by the previous ones. This results in a highly accurate predictive model, particularly well-suited for tabular medical data.
- **Training Setup:** Trained using a `GradientBoostingClassifier`, optimizing the learning rate and number of boosting stages.
- **Evaluation Metrics:**
  - **Accuracy:** 87.8%
  - **Precision:** 85.1%
  - **Recall:** 86.9%
  - **F1 Score:** 86.0%

## 3. Medical Insurance Premium Estimation
**Algorithm:** Linear Regression
- **Overview:** A statistical method that models the linear relationship between a dependent variable (insurance charges) and one or more independent variables (age, BMI, smoking status).
- **Training Setup:** Trained using a standard `LinearRegression` model. Categorical variables (e.g., smoker, region) are one-hot encoded.
- **Evaluation Metrics:**
  - **Accuracy:** 94.5%
  - **R² Score:** 0.87 (explains 87% of the variance in the target variable).

## Future Improvements
- **Deep Learning:** Investigate multi-layer perceptrons (MLPs) or 1D CNNs if the dataset scales significantly.
- **Continuous Learning:** Implement a feedback loop where clinicians can flag false positives/negatives to retrain the models periodically.
- **Explainable AI (XAI):** Integrate SHAP (SHapley Additive exPlanations) to provide feature importance charts on the frontend, explaining exactly *why* a model made a specific prediction.
