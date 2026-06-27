import os
import hmac
import hashlib
import base64
import json
import warnings
from datetime import datetime, timedelta
from collections import defaultdict
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

_default_key = "volcan-super-secret-brand-key-2026-ONLY-FOR-LOCAL-DEV"
SECRET_KEY = os.getenv("SECRET_KEY", _default_key)
if SECRET_KEY == _default_key:
    warnings.warn(
        "SECRET_KEY is using the insecure default value. "
        "Set the SECRET_KEY environment variable in production!",
        stacklevel=1,
    )
security = HTTPBearer()

# ─── Rate Limiting (in-memory) ───────────────────────────────────────────────
# Stores: ip → list of timestamps of failed login attempts
_login_attempts: dict[str, list] = defaultdict(list)
MAX_ATTEMPTS = 5
WINDOW_SECONDS = 15 * 60  # 15 minutos


def check_rate_limit(ip: str) -> None:
    """Raise 429 if the IP exceeded MAX_ATTEMPTS in WINDOW_SECONDS."""
    now = datetime.utcnow()
    cutoff = now - timedelta(seconds=WINDOW_SECONDS)
    # Keep only recent attempts
    _login_attempts[ip] = [t for t in _login_attempts[ip] if t > cutoff]
    if len(_login_attempts[ip]) >= MAX_ATTEMPTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Demasiados intentos fallidos. Intentá de nuevo en 15 minutos.",
        )


def record_failed_attempt(ip: str) -> None:
    _login_attempts[ip].append(datetime.utcnow())


def clear_attempts(ip: str) -> None:
    _login_attempts.pop(ip, None)


# ─── Password Hashing ─────────────────────────────────────────────────────────

def hash_password(password: str) -> str:
    salt = os.urandom(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100_000)
    return salt.hex() + ":" + key.hex()


def verify_password(password: str, hashed: str) -> bool:
    try:
        salt_hex, key_hex = hashed.split(":")
        salt = bytes.fromhex(salt_hex)
        key = bytes.fromhex(key_hex)
        new_key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, 100_000)
        return hmac.compare_digest(key, new_key)
    except Exception:
        return False


# ─── JWT-like Token ───────────────────────────────────────────────────────────

def create_token(payload: dict, expires_delta: timedelta = None) -> str:
    to_encode = payload.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(hours=24))
    to_encode.update({"exp": expire.isoformat()})

    payload_str = json.dumps(to_encode, separators=(",", ":"))
    payload_b64 = base64.urlsafe_b64encode(payload_str.encode()).decode().rstrip("=")
    signature = hmac.new(SECRET_KEY.encode(), payload_b64.encode(), hashlib.sha256).hexdigest()
    return f"{payload_b64}.{signature}"


def verify_token(token: str) -> dict | None:
    try:
        parts = token.split(".")
        if len(parts) != 2:
            return None
        payload_b64, signature = parts
        expected_sig = hmac.new(SECRET_KEY.encode(), payload_b64.encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected_sig):
            return None
        padding = "=" * (4 - (len(payload_b64) % 4))
        payload_str = base64.urlsafe_b64decode(payload_b64 + padding).decode()
        payload = json.loads(payload_str)
        exp_str = payload.get("exp")
        if exp_str and datetime.utcnow() > datetime.fromisoformat(exp_str):
            return None
        return payload
    except Exception:
        return None


# ─── Dependencies ─────────────────────────────────────────────────────────────

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    token = credentials.credentials
    payload = verify_token(token)
    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de acceso inválido, expirado o inexistente.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return payload


def require_admin(current_user: dict = Depends(get_current_user)) -> dict:
    """Dependency that requires the authenticated user to be an administrador."""
    if current_user.get("rol") != "administrador":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Se requieren permisos de administrador.",
        )
    return current_user
