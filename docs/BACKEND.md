# Backend Architecture

The backend of HealthRisk AI is a high-performance RESTful API built with **FastAPI**.

## FastAPI Structure

FastAPI was chosen because it is inherently asynchronous, highly performant (thanks to Starlette and Pydantic), and automatically generates OpenAPI (Swagger) documentation.

## Routes
The main API routes are located in `backend/app.py`:
- `GET /` - Health check endpoint.
- `POST /predict/heart` - Cardiovascular risk prediction.
- `POST /predict/diabetes` - Metabolic risk prediction.
- `POST /predict/insurance` - Financial premium estimation.

## Data Validation (Pydantic Models)
To ensure the machine learning models receive exactly the data they expect, Pydantic `BaseModel` classes are used for request validation:
```python
class HeartPredictionRequest(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: float
    chol: float
    # ...
```
If the frontend sends an invalid data type (e.g., a string instead of a float), FastAPI automatically intercepts the request and returns a structured 422 Unprocessable Entity error.

## Prediction Pipeline
1. The incoming JSON payload is validated.
2. The payload is converted into a 2D NumPy array or Pandas DataFrame matching the feature layout the model was trained on.
3. `model.predict()` is called to get the deterministic outcome.
4. `model.predict_proba()` is called (for classification models) to extract the confidence/probability percentage.
5. The data is packed into a standard JSON response dictionary and returned to the client.

## Serialization
Models are saved in the `backend/models/` directory as `.pkl` (pickle) files generated via `joblib`. They are loaded into memory globally when the FastAPI app starts, preventing I/O bottlenecks during individual API requests.
