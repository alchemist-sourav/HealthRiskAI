# Troubleshooting Guide

## Frontend Issues

### "Failed to compile" / React Hydration Errors
- **Cause:** Discrepancies between server-rendered HTML and client-rendered UI (often caused by browser extensions or invalid HTML nesting like a `<div>` inside a `<p>`).
- **Fix:** Check the terminal output. If it's an extension issue, try running the app in an Incognito window.

### Turbopack Build Fails
- **Cause:** Duplicate `package-lock.json` or `.git` folders in parent directories can confuse Next.js file watchers and Turbopack pathing.
- **Fix:** Ensure there are no nested git repositories. Clear the `.next` directory and run `npm run dev` again.

## Backend Issues

### `ModuleNotFoundError: No module named 'fastapi'`
- **Cause:** The Python virtual environment is not activated, or dependencies were not installed.
- **Fix:** Ensure you run `source venv/bin/activate` (Mac/Linux) or `.\venv\Scripts\Activate.ps1` (Windows) before running `pip install -r requirements.txt`.

### Model Deserialization Error (`EOFError` or `ValueError`)
- **Cause:** The `.pkl` files in `backend/models/` might be corrupt or trained on a different version of Scikit-learn than the one installed in your environment.
- **Fix:** Ensure you are using the exact Scikit-learn version specified in `requirements.txt`. If necessary, retrain the models using the provided Jupyter notebooks/scripts and overwrite the `.pkl` files.

### CORS Errors
- **Cause:** The frontend is making a request from an origin (e.g., `127.0.0.1:3000`) that the backend (`app.py` CORSMiddleware) does not explicitly allow.
- **Fix:** Add your frontend's exact URL to the `allow_origins` array in `backend/app.py`.
