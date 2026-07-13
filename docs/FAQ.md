# Frequently Asked Questions (FAQ)

### 1. Are the ML predictions 100% accurate?
No. Machine learning models provide probabilistic estimates based on historical data. They are designed to *assist* healthcare professionals, not replace them. Always consult a licensed clinician for medical diagnoses.

### 2. Why use FastAPI instead of Node.js for the backend?
The Python ecosystem (Scikit-learn, Pandas, Joblib) is the industry standard for machine learning. FastAPI bridges the gap by providing a modern, asynchronous web framework that natively integrates with Python ML libraries, something Node.js cannot do as efficiently natively.

### 3. Can I use this for real patients?
This repository is currently a prototype / proof-of-concept for educational and portfolio purposes. Before using it in a clinical setting, it must undergo rigorous compliance checks (such as HIPAA in the US), rigorous bias-testing across diverse demographics, and clinical validation.

### 4. How can I change the color theme?
The application uses a global CSS variable system located in `frontend/app/globals.css`. You can modify the `--primary`, `--danger`, `--warning`, and `--success` HSL values to re-theme the entire application instantly.

### 5. My backend isn't connecting to the frontend. What's wrong?
Ensure your backend is running on `http://127.0.0.1:8000` and that the frontend `.env.local` variable `NEXT_PUBLIC_API_URL` exactly matches that URL without a trailing slash. Also, verify that the `CORSMiddleware` in `backend/app.py` permits requests from your frontend port (usually `localhost:3000`).
