# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Initialize my FastAPI server instance
app = FastAPI(title="Secure Portfolio API")

# STUDY NOTE: Define which external domains are allowed to talk to my API.
# This prevents malicious websites from trying to hijack my backend endpoints.
# Port 5173 is where my local React development server runs.
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# STUDY NOTE: Add Cross-Origin Resource Sharing (CORS) middleware to my app pipeline.
# If I don't configure this, my browser's built-in security policies will throw a 
# network block error when my frontend tries to fetch data from my backend!
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Only accept traffic from my trusted React domains
    allow_credentials=True,         # Allow cookies/authentication sessions if needed later
    allow_methods=["*"],            # Allow all standard HTTP actions (GET, POST, etc.)
    allow_headers=["*"],            # Allow any incoming headers (like Content-Type)
)

# My basic health-check route to confirm the system is online
@app.get("/")
def read_root():
    """
    Baseline health-check endpoint.
    Allows my frontend (and recruiters!) to confirm the Python server is actively running.
    """
    return {
        "status": "online",
        "message": "Secure Portfolio Backend API is operational"
    }