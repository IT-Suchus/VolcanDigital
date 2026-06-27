import os
import time
import subprocess
import sys

try:
    import psycopg2
    HAS_PSYCOPG2 = True
except ImportError:
    HAS_PSYCOPG2 = False


def wait_for_db(retries: int = 30, delay: float = 2.0):
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("ERROR: DATABASE_URL not set.")
        sys.exit(1)

    if not HAS_PSYCOPG2:
        print("psycopg2 not available, skipping DB wait check.")
        return

    print("Waiting for database connection...")
    for i in range(retries):
        try:
            conn = psycopg2.connect(db_url)
            conn.close()
            print("Database is ready!")
            return
        except Exception as e:
            print(f"  [{i+1}/{retries}] DB not ready: {e}")
            time.sleep(delay)

    print("ERROR: Database connection timeout after all retries.")
    sys.exit(1)


def run_migrations():
    print("Running Alembic migrations...")
    result = subprocess.run(
        ["alembic", "upgrade", "head"],
        capture_output=False,
    )
    if result.returncode != 0:
        print("ERROR: Migrations failed.")
        sys.exit(result.returncode)
    print("Migrations done.")


def run_seed():
    print("Running seed script...")
    result = subprocess.run(["python", "seed.py"], capture_output=False)
    if result.returncode != 0:
        print("ERROR: Seed failed.")
        sys.exit(result.returncode)
    print("Seed done.")


def start_server():
    # Railway injects PORT; default to 8000 for local
    port = os.getenv("PORT", "8000")
    print(f"Starting FastAPI server on port {port}...")
    os.execvp(
        "uvicorn",
        ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", port],
    )


if __name__ == "__main__":
    wait_for_db()
    run_migrations()
    run_seed()
    start_server()
