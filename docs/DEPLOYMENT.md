# Deployment Guide

HealthRisk AI's decoupled architecture allows the frontend and backend to be deployed on separate, specialized hosting platforms.

## Frontend Deployment (Vercel)

Vercel is the optimal hosting provider for Next.js applications, offering edge network caching and zero-config deployments.

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com).
3. Click "Add New Project" and import your GitHub repository.
4. Set the **Root Directory** to `frontend`.
5. Under Environment Variables, add:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-url.onrender.com` (Replace with your actual backend production URL).
6. Click **Deploy**. Vercel will automatically run `npm run build` and deploy the site.

## Backend Deployment (Render or Railway)

Render and Railway are excellent PaaS (Platform as a Service) providers for Python/FastAPI applications.

### Deploying on Render
1. Log in to [Render](https://render.com).
2. Create a new "Web Service".
3. Connect your GitHub repository.
4. Set the **Root Directory** to `backend`.
5. Set the **Environment** to `Python 3`.
6. Set the **Build Command** to: `pip install -r requirements.txt`.
7. Set the **Start Command** to: `uvicorn app:app --host 0.0.0.0 --port $PORT`.
8. Click **Create Web Service**. 

### CORS Configuration
Ensure that in `backend/app.py`, the `CORSMiddleware` allows requests from your deployed Vercel frontend URL:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://healthriskai.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Environment Variables
Always ensure that production environments do not use `http://localhost` for API routes. 
- The frontend needs to know where the backend lives via `NEXT_PUBLIC_API_URL`.
- The backend needs to know which origins to accept via `ALLOWED_ORIGINS` (if configured dynamically).
