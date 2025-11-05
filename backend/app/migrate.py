import os
from pathlib import Path
from typing import List

from app.db import get_conn, put_conn


def _read_sql_file(path: Path) -> str:
    with path.open("r", encoding="utf-8") as f:
        return f.read()


def run_migrations(directory: Path) -> None:
    sql_files: List[Path] = sorted([p for p in directory.glob("*.sql")])
    if not sql_files:
        print("No migration files found.")
        return
    conn = get_conn()
    try:
        with conn:
            with conn.cursor() as cur:
                for path in sql_files:
                    sql = _read_sql_file(path)
                    print(f"Applying migration: {path.name}")
                    cur.execute(sql)
        print("Migrations applied successfully.")
    finally:
        put_conn(conn)


if __name__ == "__main__":
    base = Path(__file__).resolve().parent.parent
    migrations_dir = base / "migrations"
    run_migrations(migrations_dir)




