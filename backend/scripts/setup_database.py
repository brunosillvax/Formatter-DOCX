import os
import sys
from pathlib import Path

# Adicionar o diretório backend ao PYTHONPATH
backend_dir = str(Path(__file__).parent.parent)
sys.path.append(backend_dir)

import bcrypt
import psycopg2
from app.config import settings

def setup_database():
    print("Conectando ao banco de dados...")
    conn = psycopg2.connect(settings.database_url)
    cur = conn.cursor()
    
    print("Criando tabelas...")
    # Criar tabelas
    cur.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        hashed_password TEXT NOT NULL
    )
    """)
    
    cur.execute("""
    CREATE TABLE IF NOT EXISTS templates (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        preview_url TEXT,
        rules JSONB NOT NULL DEFAULT '{}'
    )
    """)
    
    # Criar usuário admin
    print("Criando usuário admin...")
    admin_password = "admin"
    hashed = bcrypt.hashpw(admin_password.encode(), bcrypt.gensalt())
    try:
        cur.execute(
            "INSERT INTO users (username, hashed_password) VALUES (%s, %s)",
            ("admin", hashed.decode())
        )
    except psycopg2.IntegrityError:
        print("Usuário admin já existe")
        conn.rollback()
    else:
        conn.commit()
    
    print("Configuração concluída!")
    cur.close()
    conn.close()

if __name__ == "__main__":
    setup_database()