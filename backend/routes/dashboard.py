from fastapi import APIRouter

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/")
def dashboard():

    return {
        "overview": {
            "patients": 2487,
            "high_risk": 421,
            "low_risk": 1678,
            "medium_risk": 388
        },

        "insurance": {
            "average_premium": 7425,
            "highest_prediction": 38542,
            "lowest_prediction": 1124
        },

        "heart": {
            "accuracy": 0.85,
            "roc_auc": 0.905
        },

        "diabetes": {
            "status": "Coming Soon"
        },

        "hospital": {
            "risk_score": 81
        }
    }