# Contribution Guide

Welcome to the HealthRisk AI documentation! This guide provides more in-depth technical details on how to contribute code to the repository.

## 1. Branching Strategy

We use a standard Git Flow:
- `main`: Stable release branch. Do not commit directly here.
- `develop`: Integration branch for features.
- `feature/<name>`: For new features (e.g., `feature/wearable-api`).
- `bugfix/<name>`: For bug fixes (e.g., `bugfix/sidebar-mobile-issue`).

## 2. Frontend Standards

- **Components:** Use functional components and React Hooks.
- **Styling:** We exclusively use Tailwind CSS. Do not write custom CSS in `globals.css` unless defining core CSS variables. Use the `glass-card` class for container styling to maintain the aesthetic.
- **Icons:** Use `lucide-react`. Do not import heavy SVG libraries.
- **State:** Keep state as localized as possible. Avoid global state managers (like Redux) unless strictly necessary; prefer React Context if prop-drilling exceeds 3 levels.

## 3. Backend Standards

- **Typing:** Python Type Hints are mandatory. Every function must define parameter and return types.
- **Validation:** Use Pydantic models for all API requests and responses. Do not rely on raw `Request` dictionaries.
- **Formatting:** Code is formatted using `black`. Run `black .` before committing.

## 4. ML Model Updates

If you are proposing a new Machine Learning model or an update to an existing one:
1. Provide a Jupyter Notebook in the `backend/scripts/` directory showing your Exploratory Data Analysis (EDA), feature engineering, and training process.
2. Ensure you have evaluated the model using stratified cross-validation.
3. Compare the F1 Score of your new model against the existing baseline. If it is an improvement, serialize it via `joblib` and update the `.pkl` file in `backend/models/`.
