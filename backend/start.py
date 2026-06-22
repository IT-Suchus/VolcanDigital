import os
import time
import subprocess
import sys
import psycopg2

def wait_for_db():
    db_url = os.getenv("DATABASE_URL", "postgresql://volcan_user:volcan_password@db:5432/volcan_db")
    print("Waiting for database connection...")
    for i in range(30):
        try:
            conn = psycopg2.connect(db_url)
            conn.close()
            print("Database is ready!")
            return
        except Exception as e:
            print(f"Database not ready yet ({e}), retrying in 1s... ({i+1}/30)")
            time.sleep(1)
    print("Database connection timeout.")
    sys.exit(1)

def run_migrations():
    print("Checking migrations...")
    versions_dir = os.path.join("alembic", "versions")
    os.makedirs(versions_dir, exist_ok=True)
    
    # Check if there are any migration files
    has_migrations = any(f.endswith(".py") for f in os.listdir(versions_dir))
    if not has_migrations:
        print("No migrations found. Generating initial migration...")
        result = subprocess.run(["alembic", "revision", "--autogenerate", "-m", "Init"], capture_output=False)
        if result.returncode != 0:
            print("Autogenerate migration failed.")
            sys.exit(result.returncode)

    print("Running migrations...")
    result = subprocess.run(["alembic", "upgrade", "head"], capture_output=False)
    if result.returncode != 0:
        print("Migrations failed.")
        sys.exit(result.returncode)

def run_seed():
    print("Running seed script...")
    result = subprocess.run(["python", "seed.py"], capture_output=False)
    if result.returncode != 0:
        print("Seed failed.")
        sys.exit(result.returncode)

def start_server():
    print("Starting FastAPI server...")
    os.execvp("uvicorn", ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"])

if __name__ == "__main__":
    wait_for_db()
    run_migrations()
    run_seed()
    start_server()
