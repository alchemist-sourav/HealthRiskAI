# Testing Guide

To ensure HealthRisk AI remains robust and reliable, manual and automated testing must be performed before deploying updates.

## Local Manual Verification

Before submitting a Pull Request, manually verify the core flows of the application:

1. **Dashboard**
   - Verify that the 6 KPI cards load and their animated counters function correctly.
   - Confirm that the Recharts components (Area and Bar charts) render data without throwing console errors.

2. **Prediction Clinical Workflow**
   - Navigate to `/predict`.
   - Submit the form with default/healthy parameters and confirm a "Low Risk" response.
   - Submit the form with extreme parameters (e.g., age 75, max cholesterol, max glucose) and verify that the risk gauges reflect a "High Risk" state.
   - Ensure the "Overall Health Score" updates correctly based on the sub-model predictions.

3. **Analytics & Simulation**
   - Verify that hovering over Heatmaps and Radar charts triggers the customized tooltips.
   - Navigate to the HealthRisk Lab (`/simulation`), select a scenario (e.g., Global Pandemic), and verify that the 2-second loading animation resolves to updated metric cards.

4. **AI Report Export**
   - Navigate to `/report`.
   - Check that the Risk Timeline graph renders smoothly.

## Automated Testing (Backend)

The FastAPI backend uses `pytest` for unit testing. To run the tests:

```bash
cd backend
pytest
```
Ensure all API endpoints (`/predict/heart`, `/predict/diabetes`, `/predict/insurance`) return `200 OK` under valid payloads and `422 Unprocessable Entity` for invalid payloads.

## ESLint & TypeScript Checking (Frontend)

To catch syntax and type errors in the Next.js frontend:

```bash
cd frontend
npm run lint
npm run build
```
A successful `npm run build` guarantees that all pages are statically generated without TypeScript or rendering errors.
