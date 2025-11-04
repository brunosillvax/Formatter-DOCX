import json
from typing import Any, Optional
import redis
from .config import settings


_client: Optional[redis.Redis] = None


def get_redis() -> redis.Redis:
    global _client
    if _client is None:
        _client = redis.from_url(settings.redis_url, decode_responses=True)
    return _client


def cache_set(key: str, value: Any, ttl_seconds: int) -> None:
    data = value if isinstance(value, str) else json.dumps(value)
    get_redis().setex(key, ttl_seconds, data)


def cache_get_json(key: str) -> Optional[Any]:
    val = get_redis().get(key)
    if val is None:
        return None
    try:
        return json.loads(val)
    except Exception:
        return None


def cache_delete(key: str) -> None:
    get_redis().delete(key)
