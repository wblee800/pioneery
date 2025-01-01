from openai import OpenAI
import os
from django.conf import settings

class ChatGPTService:
    def __init__(self):
        self.client = OpenAI(
            base_url=settings.OPENAI_BASE_URL,
            api_key=settings.OPENAI_API_KEY,
        )

    def chat_completion(self, query, stream=False):
        response = self.client.chat.completions.create(
            model=settings.OPENAI_LLM_MODEL,
            messages=[{"role": "user", "content": query}],
            stream=stream
        )
        return response
