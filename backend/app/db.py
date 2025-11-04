from typing import Optional, Any
from .config import settings


_pool: Optional[Any] = None


def get_pool() -> Any:
    global _pool
    if _pool is None:
        print(f"Iniciando conexão com o banco: {settings.database_url}")
        # Lazy import to allow the application to start without PostgreSQL client
        # in development environments where the database is not required.
        try:
            import psycopg2
            import psycopg2.pool
            print("Biblioteca psycopg2 importada com sucesso")
        except Exception as exc:  # pragma: no cover
            print(f"Erro ao importar psycopg2: {str(exc)}")
            raise RuntimeError(
                "PostgreSQL client library 'psycopg2' is required for database access."
            ) from exc

        try:
            _pool = psycopg2.pool.SimpleConnectionPool(
                minconn=1,
                maxconn=5,
                dsn=settings.database_url,
            )
            print("Pool de conexões criado com sucesso")
        except Exception as e:
            print(f"Erro ao criar pool de conexões: {str(e)}")
            raise
    return _pool


def get_conn():
    return get_pool().getconn()


def put_conn(conn) -> None:
    get_pool().putconn(conn)
