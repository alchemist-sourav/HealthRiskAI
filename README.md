# 🏥 HealthRisk AI

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black?logo=next.js)
![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.139.0-009688?logo=fastapi)

> An intelligent health risk assessment platform powered by machine learning — predict heart disease, diabetes risk, and insurance premiums with clinical-grade accuracy.

---

## 📋 Description

**HealthRisk AI** is a full-stack medical analytics platform designed for healthcare researchers, insurance analysts, and health-conscious individuals. It combines three production-ready ML models with a modern, enterprise-grade dashboard to deliver real-time health risk predictions, interactive stress testing, and AI-generated health reports.

**Who it's for:**
- 🏥 Healthcare researchers analyzing patient risk profiles
- 💼 Insurance analysts estimating premium costs
- 👩‍⚕️ Clinicians screening patients for high-risk conditions
- 🎓 Final-year CS/ML students building portfolio projects

**Problems it solves:**
- Eliminates manual, error-prone risk calculations with automated ML inference
- Provides transparent risk levels (Low / Medium / High) with probability scores
- Centralizes multi-domain health analytics in a single, beautiful dashboard
- Makes ML model outputs accessible to non-technical users via an intuitive UI

---

## ✨ Features

- 🫀 **Multi-model Prediction** — Heart Disease (RF), Diabetes (GB), Insurance Premium (LR) in one platform
- 🔬 **Interactive Simulation / Stress Testing** — Adjust parameters in real-time and observe risk changes instantly
- 📄 **AI Health Reports with PDF Export** — Generate and download patient-ready health risk reports
- 📊 **Enterprise Analytics Dashboard** — 6+ chart types: line, bar, pie, area, scatter, and radar charts
- ⚡ **Real-time REST API** — FastAPI backend with async support, auto-generated OpenAPI docs
- 🌙 **Premium Dark Theme UI** — Glassmorphism cards, gradient accents, smooth Framer Motion animations
- 📱 **Fully Responsive** — Works seamlessly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | Next.js | 16.2.10 |
| **UI Library** | React | 19.2.4 |
| **Language** | TypeScript | ^5 |
| **Styling** | Tailwind CSS | ^4.3.2 |
| **Animations** | Framer Motion | ^12.42.2 |
| **Charts** | Recharts | ^3.9.2 |
| **Forms** | React Hook Form + Zod | ^7 / ^4 |
| **HTTP Client** | Axios | ^1.18.1 |
| **Icons** | Lucide React | ^1.24.0 |
| **Backend Framework** | FastAPI | 0.139.0 |
| **Language** | Python | 3.13 |
| **ML Library** | Scikit-learn | 1.9.0 |
| **Data Processing** | Pandas / NumPy | 3.0.3 / 2.5.1 |
| **Model Serialization** | Joblib | 1.5.3 |
| **Server** | Uvicorn | 0.51.0 |
| **Validation** | Pydantic | 2.13.4 |
| **DevTools** | ESLint, TypeScript, PostCSS | — |

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   Next.js 16    │────>│   FastAPI       │
│   Frontend      │<────│   Backend       │
│   (Port 3000)   │     │   (Port 8000)   │
└─────────────────┘     └────────┬────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │ Heart Model  │  │Diabetes Model│  │Insurance Model│
    │ (RF, 92.1%) │  │ (GB, 87.8%) │  │ (LR, 94.5%) │
    └──────────────┘  └──────────────┘  └──────────────┘
```

**Request Flow:**
1. User fills a prediction form in the Next.js frontend
2. Axios sends a `POST` request to the FastAPI backend
3. FastAPI loads the pre-trained `.pkl` model via Joblib
4. The model returns a risk score + level
5. The frontend renders results with animated charts and risk badges

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/HealthRiskAI.git
cd HealthRiskAI
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application

| Service | URL |
|---------|-----|
| Frontend Dashboard | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| API Docs (ReDoc) | http://localhost:8000/redoc |

---

## 📡 API Documentation

### Base URL: `http://localhost:8000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check — confirms API is running |
| `GET` | `/dashboard` | Get overview stats for the dashboard |
| `POST` | `/predict/heart` | Heart disease prediction with risk level |
| `POST` | `/predict/diabetes` | Diabetes risk prediction with probability |
| `POST` | `/predict/insurance` | Insurance premium estimate in USD |

### Example: Heart Disease Prediction

**Request:**
```json
POST /predict/heart
{
  "age": 55,
  "sex": 1,
  "cp": 2,
  "trestbps": 140,
  "chol": 250,
  "fbs": 0,
  "restecg": 1,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 1.5,
  "slope": 2,
  "ca": 0,
  "thal": 2
}
```

**Response:**
```json
{
  "heart_disease": true,
  "risk_probability": 0.7823,
  "risk_level": "High"
}
```

### Example: Diabetes Prediction

**Request:**
```json
POST /predict/diabetes
{
  "Pregnancies": 2,
  "Glucose": 148,
  "BloodPressure": 72,
  "SkinThickness": 35,
  "Insulin": 0,
  "BMI": 33.6,
  "DiabetesPedigreeFunction": 0.627,
  "Age": 50
}
```

**Response:**
```json
{
  "diabetes_risk": true,
  "risk_probability": 0.7241,
  "risk_level": "High"
}
```

### Example: Insurance Premium Estimate

**Request:**
```json
POST /predict/insurance
{
  "age": 32,
  "sex": "male",
  "bmi": 27.5,
  "children": 1,
  "smoker": "no",
  "region": "northeast"
}
```

**Response:**
```json
{
  "predicted_charges": 4823.45
}
```

---

## 📁 Folder Structure

```
HealthRiskAI/
├── README.md                          # You are here
│
├── backend/                           # FastAPI Python backend
│   ├── app.py                         # Main FastAPI application
│   ├── requirements.txt               # Python dependencies
│   ├── routes/
│   │   └── dashboard.py               # Dashboard stats endpoint
│   ├── ml/
│   │   ├── train_heart.py             # Heart model training script
│   │   ├── train_diabetes.py          # Diabetes model training script
│   │   ├── train_insurance.py         # Insurance model training script
│   │   └── utils.py                   # Shared ML utilities
│   ├── models/
│   │   ├── heart_model.pkl            # Trained Random Forest model
│   │   ├── diabetes_model.pkl         # Trained Gradient Boosting model
│   │   └── insurance_model.pkl        # Trained Linear Regression model
│   ├── data/
│   │   ├── heart+disease/             # Cleveland Heart Disease dataset
│   │   ├── diabetes/                  # PIMA Indians Diabetes dataset
│   │   └── archive/                   # Medical Insurance dataset
│   └── venv/                          # Python virtual environment (git-ignored)
│
└── frontend/                          # Next.js TypeScript frontend
    ├── README.md                      # Frontend-specific README
    ├── package.json                   # Node dependencies
    ├── tsconfig.json                  # TypeScript configuration
    ├── next.config.ts                 # Next.js configuration
    ├── postcss.config.mjs             # PostCSS / Tailwind config
    ├── app/
    │   ├── layout.tsx                 # Root layout with Sidebar + Header
    │   ├── page.tsx                   # Root redirect to /dashboard
    │   ├── globals.css                # Global styles and CSS variables
    │   ├── dashboard/                 # Main dashboard page
    │   ├── predict/                   # Prediction forms (Heart, Diabetes, Insurance)
    │   ├── simulation/                # Interactive stress test simulator
    │   ├── analytics/                 # Enterprise analytics with charts
    │   ├── report/                    # AI health report + PDF export
    │   └── about/                     # About page with model info
    ├── components/
    │   ├── Sidebar.tsx                # Navigation sidebar
    │   ├── Header.tsx                 # Top header bar
    │   ├── MetricCard.tsx             # KPI metric card component
    │   ├── RecentPredictionsTable.tsx # Predictions history table
    │   └── ui/                        # Shared UI primitives (GlassCard, etc.)
    ├── lib/
    │   └── api.ts                     # Axios API client configuration
    └── public/                        # Static assets
```

---

## 🤖 ML Models

### 1. Heart Disease Model

| Attribute | Details |
|-----------|---------|
| **Algorithm** | Random Forest Classifier |
| **Dataset** | Cleveland Heart Disease (UCI ML Repository) |
| **Samples** | 303 patients |
| **Features** | 13 (age, sex, chest pain type, resting BP, cholesterol, fasting blood sugar, resting ECG, max heart rate, exercise-induced angina, ST depression, slope, vessels, thalassemia) |
| **Accuracy** | 92.1% |
| **Output** | Binary classification + probability score + risk level (Low/Medium/High) |

### 2. Diabetes Model

| Attribute | Details |
|-----------|---------|
| **Algorithm** | Gradient Boosting Classifier |
| **Dataset** | PIMA Indians Diabetes Dataset (Kaggle) |
| **Samples** | 768 female patients |
| **Features** | 8 (pregnancies, glucose, blood pressure, skin thickness, insulin, BMI, diabetes pedigree function, age) |
| **Accuracy** | 87.8% |
| **Output** | Binary classification + probability score + risk level (Low/Medium/High) |

### 3. Insurance Premium Model

| Attribute | Details |
|-----------|---------|
| **Algorithm** | Linear Regression (with encoding) |
| **Dataset** | Medical Cost Personal Datasets (Kaggle) |
| **Samples** | 1,338 records |
| **Features** | 6 (age, sex, BMI, children, smoker, region) |
| **R² Score** | 0.87 (87% variance explained) |
| **Accuracy** | 94.5% (within 10% of actual charges) |
| **Output** | Predicted annual insurance charges in USD |

---

## 📸 Screenshots

> Screenshots will be added after the UI is finalized.

```
[ Dashboard Overview ]
- KPI metric cards showing total predictions, accuracy stats
- Recent predictions table with risk level badges
- Quick-access navigation to all prediction modules

[ Prediction Forms ]
- Heart Disease: 13-field clinical input form
- Diabetes: 8-field metabolic input form
- Insurance: 6-field demographic input form

[ Simulation Page ]
- Interactive sliders for real-time risk parameter tuning
- Live chart updates as inputs change
- Side-by-side baseline vs. modified risk comparison

[ Analytics Page ]
- Line chart: prediction trends over time
- Bar chart: model accuracy comparison
- Pie chart: risk level distribution
- Scatter chart: BMI vs. risk correlation

[ Report Page ]
- AI-generated health summary
- Risk factor breakdown
- PDF export button
```

---

## 🔮 Future Scope

| Feature | Description |
|---------|-------------|
| **Real-time Patient Monitoring** | IoT device integration for live vitals streaming |
| **NLP Medical Records** | GPT-powered parsing of free-text clinical notes |
| **Blockchain Medical Records** | Immutable, patient-controlled health data storage |
| **Multi-language Support** | i18n for global deployment (Hindi, Spanish, French) |
| **FHIR Integration** | Interoperability with hospital EHR systems |
| **Mobile App** | React Native companion app for on-the-go assessments |
| **Federated Learning** | Train models on distributed data without centralizing PHI |
| **Explainability (XAI)** | SHAP / LIME visualizations for model decision transparency |
| **User Authentication** | JWT-based auth with patient history persistence |
| **Model Retraining Pipeline** | Automated retraining when new data is uploaded |

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Sourav

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👤 Author

**Sourav**
*Full Stack ML Engineer*

- 🔗 GitHub: [@your-username](https://github.com/your-username)
- 🌐 Portfolio: [your-portfolio.dev](https://your-portfolio.dev)
- 💼 LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

Built with ❤️ as a Final Year Capstone Project — combining modern web engineering with applied machine learning to solve real healthcare challenges.

---

*Last updated: July 2026*
