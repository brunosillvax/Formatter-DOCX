DO $$ 
BEGIN
    -- Criar tabelas
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        hashed_password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS templates (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        preview_url TEXT,
        rules JSONB NOT NULL DEFAULT '{}'::jsonb
    );

    -- Inserir usuário admin se não existir
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = 'admin') THEN
        INSERT INTO users (username, hashed_password)
        VALUES ('admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewqyGrHZRq3HCCke');
    END IF;

    -- Inserir template padrão se não existir
    IF NOT EXISTS (SELECT 1 FROM templates WHERE id = 'relatorio_prof') THEN
        INSERT INTO templates (id, name, description, rules)
        VALUES (
            'relatorio_prof',
            'Relatório Profissional',
            'Hierarquia, rótulos e ênfases',
            '{"structure":{"sections":["title","intro","body","conclusion"]}}'::jsonb
        );
    END IF;
END $$;