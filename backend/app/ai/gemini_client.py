import google.generativeai as genai
from ..config import settings


def get_gemini_client() -> genai:
    if not settings.gemini_api_key:
        raise RuntimeError("GEMINI_API_KEY não configurada")
    genai.configure(api_key=settings.gemini_api_key)
    return genai


def get_gemini_model_name() -> str:
    return settings.gemini_model
