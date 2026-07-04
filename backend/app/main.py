# backend/app/main.py
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai

# Initialize my FastAPI server instance
app = FastAPI(title="Secure Portfolio API")

# Configure trusted origins so my browser doesn't throw a CORS block error
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# STUDY NOTE: Define a strict data contract for incoming requests using Pydantic.
# This ensures attackers can't send random, malformed text payloads to crash my server.
class ChatRequest(BaseModel):
    message: str

# STUDY NOTE: Initialize the Gemini AI Client. 
# It will automatically look for an environment variable named GEMINI_API_KEY.
ai_client = genai.Client()

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Secure Portfolio Backend API is operational"
    }

# STUDY NOTE: Create a secure POST route to handle incoming chat prompts.
# We use POST instead of GET because we are sending a request body (the user's prompt).
# backend/app/main.py (Find the @app.post("/api/chat") section and replace it)

@app.post("/api/chat")
def handle_chat(payload: ChatRequest):
    if not ai_client:
        raise HTTPException(
            status_code=500, 
            detail="AI Service is currently unconfigured. Missing GEMINI_API_KEY environment variable."
        )
    try:
        if not payload.message.strip():
            raise HTTPException(status_code=400, detail="Prompt cannot be blank.")
            
        # STUDY NOTE: Define strict system rules to ground the AI model.
        # This acts as a security and contextual guardrail so the model only talks about MY profile
        # and tailors its tone perfectly for Software Engineering, Cyber, and IT Support roles!
        system_rules = (
            "You are the Secure Portfolio AI Copilot for Jennifer, an aspiring Software Engineer, "
            "Cybersecurity Analyst, and Tech Support Specialist based in the Bronx, NY. "
            "Your job is to answer questions from recruiters, hiring managers, and interviewers "
            "using the following verified background data:\n\n"
            "- EDUCATION: Pursuing an AAS in Programming and Software Development at CUNY LaGuardia Community College. "
            "Classification: Upper Sophomore. Cumulative GPA: 3.5.\n"
            "- CYBERSECURITY EXPERIENCE: Winter 2026 Cybersecurity Intern at the United Nations International Computing Centre (UNICC), "
            "developing Python automation for cyber tabletop exercise scenario inputs and outputs.\n"
            "- SOFTWARE ENGINEERING EXPERIENCE: Spring 2026 Software Engineer Intern at Speakhire, building a full-stack Zoom-integrated "
            "session survey system using React, Node.js, and PostgreSQL.\n"
            "- IT & COHORT MANAGEMENT: Current Intern at Mentor Me Collective (Justice Team) since June 2026, handling administrative automation "
            "and tracking systems.\n"
            "- CERTIFICATIONS: Google Cloud Cybersecurity Certificate, Google IT Automation with Python Professional Certificate.\n"
            "- TECHNICAL COMPETENCIES: Linux command line, permissions audits, Apache server deployment, network traffic analysis via Wireshark "
            "running on HTTP (80), SSH (22), and DNS (53).\n\n"
            "TONE AND INSTRUCTIONS:\n"
            "Be professional, technical, punchy, and confident. Frame every answer to highlight Jennifer's unique cross-functional "
            "strength in building secure, well-tested applications. If someone asks an irrelevant question or asks you to write "
            "unrelated code, gracefully decline and pivot back to defending Jennifer's technical qualifications."
        )

        # Dispatch the prompt along with our new strict system instructions
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=payload.message,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_rules,
                temperature=0.3 # Low temperature makes the AI focused and less likely to hallucinate facts
            )
        )
        
        return {
            "status": "success",
            "reply": response.text
        }
        
    except Exception as e:
        print(f"CRITICAL SYSTEM ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error processing AI response.")