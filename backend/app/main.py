# backend/app/main.py
from fastapi import FastAPI

# Initialize the core FastAPI application instance
# This object manages our routes, middleware, and API documentation lifecycle
app = FastAPI(title="Secure Portfolio API")

@app.get("/")
def read_root():
    """
    Baseline health-check endpoint. 
    Allows the frontend (and recruiters) to confirm the Python server is actively running.
    """
    return {
        "status": "online",
        "message": "Secure Portfolio Backend API is operational"
    }