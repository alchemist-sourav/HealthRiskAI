# Project Overview

## Problem Statement

Globally, non-communicable diseases (NCDs) like cardiovascular diseases and diabetes are the leading causes of mortality. Additionally, unexpected healthcare expenses create immense financial burdens on patients. Traditional diagnosis and risk-assessment models rely heavily on manual clinical evaluations, which can be time-consuming, expensive, and subject to human error or delay. There is a pressing need for a unified, predictive platform that can assess multiple health and financial risk factors simultaneously using accessible patient data.

## Objectives

1. **Early Detection:** Provide highly accurate, real-time predictive modeling for heart disease and type-2 diabetes using standard clinical metrics.
2. **Financial Forecasting:** Estimate annual medical insurance premiums to help patients and insurers prepare for healthcare costs.
3. **Clinical Workflow:** Deliver an intuitive, professional, and accessible user interface tailored for healthcare professionals and analysts.
4. **Data Privacy & Security:** Ensure patient data is handled securely within a decoupled, robust architecture without permanent retention of sensitive records in the prediction pipeline.

## Solution

**HealthRisk AI** is a production-grade, full-stack AI platform built to address these challenges. It integrates three machine learning models into a unified dashboard:
- **Cardiovascular Risk:** Uses a Random Forest classifier.
- **Metabolic Risk (Diabetes):** Uses a Gradient Boosting classifier.
- **Financial Risk:** Uses a Linear Regression model.

The platform provides a comprehensive **AI Health Report** that aggregates these predictions into a single "Overall Health Score" alongside actionable medical and lifestyle recommendations. 

## System Flow

1. **Input:** The user (e.g., a clinician) enters demographic, cardiovascular, and metabolic data into the clinical workflow form on the Next.js frontend.
2. **Processing:** The frontend sends a structured JSON payload to the FastAPI backend.
3. **Prediction:** The backend loads pre-trained Scikit-learn models (via `joblib`) to compute probabilities and continuous estimates.
4. **Output:** The backend returns the risk metrics to the frontend.
5. **Visualization:** The frontend renders interactive result cards, animated risk gauges, and a detailed, downloadable AI report.

## Expected Outcome

HealthRisk AI demonstrates how machine learning can be seamlessly integrated into modern web architectures to assist in clinical decision-making. The expected outcome is a scalable prototype that proves the viability of multi-domain predictive healthcare analytics in a fast, reliable, and user-friendly web application.
