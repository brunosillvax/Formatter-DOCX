import os
import sys
from pathlib import Path

# Adicionar o diretório backend ao PYTHONPATH
backend_dir = str(Path(__file__).parent.parent)
sys.path.append(backend_dir)

import psycopg2
from app.config import settings

def seed_templates():
    print("Conectando ao banco de dados...")
    conn = psycopg2.connect(settings.database_url)
    cur = conn.cursor()
    
    try:
        # Ler e executar seed de templates
        seed_files = [
            '../migrations/002_seed_relatorio_profissional.sql',
            '../migrations/003_seed_more_templates.sql'
        ]
        
        for seed_file in seed_files:
            seed_path = os.path.join(os.path.dirname(__file__), seed_file)
            if os.path.exists(seed_path):
                print(f"Executando seed: {seed_file}")
                with open(seed_path, 'r', encoding='utf-8') as f:
                    sql = f.read()
                    cur.execute(sql)
                    conn.commit()
                print(f"Seed {seed_file} executado com sucesso!")
    
        # Verificar templates inseridos
        cur.execute("SELECT id, name FROM templates")
        templates = cur.fetchall()
        print("\nTemplates no banco:")
        for t_id, t_name in templates:
            print(f"- {t_id}: {t_name}")
            
    except Exception as e:
        conn.rollback()
        print(f"Erro: {str(e)}")
    finally:
        cur.close()
        conn.close()

if __name__ == "__main__":
    seed_templates()