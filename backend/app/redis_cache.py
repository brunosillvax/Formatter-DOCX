import json
from typing import Any, Optional
import redis
from .config import settings


_client: Optional[redis.Redis] = None


def get_redis() -> redis.Redis:
    global _client
    if _client is None:
        try:
            _client = redis.from_url(settings.redis_url, decode_responses=True)
            # Testa a conexão
            _client.ping()
        except Exception as e:
            raise RuntimeError(f"Erro ao conectar ao Redis: {str(e)}")
    return _client


def cache_set(key: str, value: Any, ttl_seconds: int) -> None:
    try:
        data = value if isinstance(value, str) else json.dumps(value)
        get_redis().setex(key, ttl_seconds, data)
    except Exception as e:
        raise RuntimeError(f"Erro ao salvar no cache: {str(e)}")


def cache_get_json(key: str) -> Optional[Any]:
    try:
        val = get_redis().get(key)
        if val is None:
            return None
        try:
            return json.loads(val)
        except Exception:
            return None
    except Exception as e:
        raise RuntimeError(f"Erro ao ler do cache: {str(e)}")


def cache_delete(key: str) -> None:
    try:
        get_redis().delete(key)
    except Exception as e:
        # Não falha se não conseguir deletar
        print(f"Aviso: Erro ao deletar do cache: {str(e)}")
