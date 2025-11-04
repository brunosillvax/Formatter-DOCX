import psycopg2
from app.config import settings

def execute_migration():
    conn = psycopg2.connect(settings.database_url)
    cur = conn.cursor()
    
    # Criar tabela de usuários
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        hashed_password TEXT NOT NULL
    )
    """)
    
    # Criar tabela de templates
    cur.execute("""
    CREATE TABLE IF NOT EXISTS templates (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        preview_url TEXT,
        rules JSONB NOT NULL DEFAULT '{}'
    )
    """)
    
    # Criar usuário padrão (admin/admin)
    from app.auth import get_password_hash
    admin_password_hash = get_password_hash("admin")
    try:
        cur.execute(
            "INSERT INTO users (username, hashed_password) VALUES (%s, %s)",
            ("admin", admin_password_hash)
        )
    except psycopg2.IntegrityError:
        # Usuário já existe
        pass
    
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    execute_migration()