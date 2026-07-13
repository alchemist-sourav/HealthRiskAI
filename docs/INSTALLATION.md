# Installation Guide

Follow these steps to set up the HealthRisk AI project locally on your machine.

## Prerequisites
- **Node.js**: v18.17.0 or higher
- **Python**: 3.10 or higher
- **Git**

## 1. Clone the Repository

```bash
git clone https://github.com/alchemist-sourav/HealthRiskAI.git
cd HealthRiskAI
```

## 2. Backend Setup (FastAPI)

Open a terminal and navigate to the `backend` directory.

### Windows

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Linux / macOS

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Run the Backend Server

```bash
uvicorn app:app --reload
```
The backend API will be available at: `http://127.0.0.1:8000`
Interactive API Docs (Swagger UI): `http://127.0.0.1:8000/docs`

## 3. Frontend Setup (Next.js)

Open a **new** terminal window and navigate to the `frontend` directory.

```bash
cd frontend
npm install
```

### Environment Variables
Copy the `.env.example` file to `.env.local`:
```bash
cp ../.env.example .env.local
```
Ensure `NEXT_PUBLIC_API_URL` is set to `http://127.0.0.1:8000`.

### Run the Frontend Server

```bash
npm run dev
```
The frontend will be available at: `http://localhost:3000`

## 4. Verify Installation

1. Open `http://localhost:3000` in your browser. You should see the HealthRisk AI dashboard.
2. Navigate to the **Prediction** page and submit a test case. 
3. If the results load correctly, the frontend and backend are successfully communicating!
