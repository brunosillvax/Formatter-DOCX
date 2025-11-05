$ErrorActionPreference = 'Stop'

Write-Host 'Aplicando migração de perfil (email/plano) no Postgres via Docker...'

function ExecSql($sql){
  docker compose exec -T db psql -U postgres -d formatter -v ON_ERROR_STOP=1 -c $sql
}

ExecSql "ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT;"
ExecSql "ALTER TABLE users ADD COLUMN IF NOT EXISTS plan_name TEXT NOT NULL DEFAULT 'Free';"
ExecSql "ALTER TABLE users ADD COLUMN IF NOT EXISTS plan_status TEXT NOT NULL DEFAULT 'active';"
ExecSql "ALTER TABLE users ADD COLUMN IF NOT EXISTS plan_expires_at TIMESTAMPTZ NULL;"
ExecSql "CREATE INDEX IF NOT EXISTS idx_users_email ON users((lower(email)));"

Write-Host 'Migração concluída com sucesso.'

