from typing import Optional
from .db import get_conn, put_conn


def get_user_by_username(username: str) -> Optional[dict]:
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id, username, hashed_password FROM users WHERE username=%s", (username,))
            row = cur.fetchone()
            if not row:
                return None
            return {"id": row[0], "username": row[1], "hashed_password": row[2]}
    finally:
        put_conn(conn)


def get_template_by_id(template_id: str) -> Optional[dict]:
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT id, name, description, preview_url, rules FROM templates WHERE id=%s",
                (template_id,),
            )
            row = cur.fetchone()
            if not row:
                return None
            return {
                "id": row[0],
                "name": row[1],
                "description": row[2],
                "preview_url": row[3],
                "rules": row[4],
            }
    finally:
        put_conn(conn)


def get_user_by_id(user_id: str) -> Optional[dict]:
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT id, username FROM users WHERE id=%s", (user_id,))
            row = cur.fetchone()
            if not row:
                return None
            return {"id": row[0], "username": row[1]}
    finally:
        put_conn(conn)