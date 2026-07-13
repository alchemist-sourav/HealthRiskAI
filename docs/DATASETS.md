# Datasets

The machine learning models in HealthRisk AI are trained on established, publicly available clinical datasets.

## 1. Cleveland Heart Disease Dataset
- **Source:** UCI Machine Learning Repository
- **Size:** 303 patients
- **Features:** 14 columns
- **Description:** A classic benchmark dataset used to predict the presence of heart disease. Features include age, sex, chest pain type (cp), resting blood pressure (trestbps), serum cholesterol (chol), fasting blood sugar (fbs), resting electrocardiographic results (restecg), maximum heart rate achieved (thalach), exercise-induced angina (exang), ST depression (oldpeak), slope of the peak exercise ST segment (slope), number of major vessels (ca), and thalassemia (thal).
- **Preprocessing:** Handled missing values (imputation). Scaled numerical features using `StandardScaler`.

## 2. PIMA Indians Diabetes Dataset
- **Source:** Kaggle / National Institute of Diabetes and Digestive and Kidney Diseases
- **Size:** 768 patients
- **Features:** 8 columns
- **Description:** Consists of female patients of Pima Indian heritage. Features include pregnancies, glucose levels, blood pressure, skin thickness, insulin levels, BMI, diabetes pedigree function, and age. The target variable is binary (onset of diabetes within 5 years).
- **Preprocessing:** Biological impossibilities (e.g., a glucose level or BMI of 0) were treated as missing values and imputed using the median of the respective columns. Data was standardized prior to training.

## 3. Medical Insurance Dataset
- **Source:** Kaggle
- **Size:** 1,338 records
- **Features:** 7 columns
- **Description:** Contains US medical insurance records. Features include age, sex, BMI, number of children, smoking status, and US region. The target variable is continuous (annual medical charges).
- **Preprocessing:** Applied label encoding for binary categorical features (sex, smoker) and one-hot encoding for multi-class categorical features (region).

## Train/Test Split
All models were trained using an 80/20 train/test split. Stratified sampling was applied to the classification datasets (Heart and Diabetes) to ensure balanced class distributions in both the training and testing sets.

## Feature Engineering
Future scope includes extracting composite indices (e.g., age-to-BMI ratios or cholesterol-to-blood-pressure interaction terms) to further improve model accuracy.
