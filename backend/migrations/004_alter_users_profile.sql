-- Adiciona campos de perfil e plano na tabela users
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS email TEXT,
    ADD COLUMN IF NOT EXISTS plan_name TEXT NOT NULL DEFAULT 'Free',
    ADD COLUMN IF NOT EXISTS plan_status TEXT NOT NULL DEFAULT 'active',
    ADD COLUMN IF NOT EXISTS plan_expires_at TIMESTAMPTZ NULL;

-- Índice simples para buscas por email (opcional)
CREATE INDEX IF NOT EXISTS idx_users_email ON users((lower(email)));

