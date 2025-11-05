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
            cur.execute("SELECT id, username, email, plan_name, plan_status, plan_expires_at FROM users WHERE id=%s", (user_id,))
            row = cur.fetchone()
            if not row:
                return None
            return {
                "id": row[0],
                "username": row[1],
                "email": row[2],
                "plan_name": row[3],
                "plan_status": row[4],
                "plan_expires_at": row[5],
            }
    finally:
        put_conn(conn)


def update_user_email(user_id: str, email: str) -> None:
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute("UPDATE users SET email=%s WHERE id=%s", (email, user_id))
            conn.commit()
    finally:
        put_conn(conn)


def update_user_plan(user_id: str, name: str, status: str, expires_at) -> None:
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                "UPDATE users SET plan_name=%s, plan_status=%s, plan_expires_at=%s WHERE id=%s",
                (name, status, expires_at, user_id),
            )
            conn.commit()
    finally:
        put_conn(conn)