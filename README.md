# Secure Portfolio Hub & AI Copilot

An interactive, full-stack developer portfolio engineered with a terminal interface. The platform features an embedded, contextual AI chatbot that acts as a real-time technical assistant to answer inquiries regarding qualifications, deployment metrics, and core system competencies.

---

## 🛠️ System Architecture

This ecosystem runs a decoupled client-server architecture with an intelligent processing layer:

*   **Frontend Client:** Built using React to handle dynamic state navigation and interactive components.
*   **Backend Interface Engine:** Powered by Python and FastAPI to expose high-performance asynchronous REST endpoints.
*   **Intelligence Pipeline:** Integrates with the Gemini 2.5 Flash model layer via the Google GenAI SDK, backed by custom context grounding rules and low-temperature constraints.

---

## 🛡️ Applied Engineering & Security Controls

*   **Secret Protection & Hygiene:** Leverages dynamic terminal profile memory space (`export`) to inject runtime API variables, keeping sensitive credentials entirely out of hardcoded raw string values.
*   **Prompt-Injection Defense:** Enforces strict backend system instructions to intercept, isolate, and decline malicious prompt manipulation attempts (e.g., jailbreak commands) and pivots back to technical profile validation.
*   **CORS Policy Controls:** Restricts application boundary traffic via FastAPI Middleware parameters to prevent unauthorized cross-origin request attempts.
*   **Deterministic Configuration:** Restricts model sampling randomness via a low temperature (`temperature=0.3`) to maximize factual output precision and mitigate model hallucinations.

---

## 🚀 Installation & Local Environment Setup

Follow these system setup steps to deploy the local configuration:

### 1. Prerequisites
Ensure you have **Node.js** and **Python 3.14+** configured on your local machine.

### 2. Backend Server Deployment
Navigate to the server workspace, initialize your isolated environment, install dependencies, and apply your credentials:

```bash
# Move into the server module
cd backend

# Initialize your python virtual environment context
python3 -m venv venv
source venv/bin/activate

# Install required framework dependencies
pip install fastapi uvicorn google-genai

# Inject your secure Gemini API credential token 
export GEMINI_API_KEY="your_api_key_here"

# Spin up the Uvicorn live reload development server
uvicorn app.main:app --reload
```

The server backend will spin up listening actively at http://127.0.0.1:8000.

### 3. Frontend Client Setup
Open a secondary terminal window to download your dependencies and run the client-side bundler:

```bash
cd frontend
npm install
npm run dev
```

Open your local browser environment to http://localhost:5173/ to view the live responsive hub.