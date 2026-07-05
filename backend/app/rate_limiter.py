import time
from fastapi import Request, HTTPException, status

# Global in-memory dictionary tracking
ip_tracker = {}

RATE_LIMIT_CEILING = 5          
TIME_WINDOW_SECONDS = 60        

async def rate_limiter(request: Request):
    xff_header = request.headers.get("x-forwarded-for")
    if xff_header:
        client_ip = xff_header.split(",")[0].strip()
    else:
        client_ip = request.client.host if request.client else "unknown_source"

    current_time = time.time()

    if client_ip not in ip_tracker:
        ip_tracker[client_ip] = {"count": 1, "window_start": current_time}
        request.state.rate_limit_current = 1
        return

    session = ip_tracker[client_ip]
    elapsed_time = current_time - session["window_start"]

    if elapsed_time > TIME_WINDOW_SECONDS:
        session["count"] = 1
        session["window_start"] = current_time
        request.state.rate_limit_current = 1
        return

    if session["count"] >= RATE_LIMIT_CEILING:
        # Instead of a cryptic system error, raise a clear 429 with custom headers
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Security core locked for 60 seconds."
        )

    session["count"] += 1
    # Save the current count to the request state so our router can see it
    request.state.rate_limit_current = session["count"]