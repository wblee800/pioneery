from django.test import TestCase
from rest_framework import status
from unittest import skip

from backend.search_api.services.chatgpt_service import ChatGPTService
from backend.search_api.services.tavily_service import TavilyService


class SearchAPITests(TestCase):
    @skip
    def test_search_view(self):
        service = TavilyService()
        response = service.search_content('캐나다 이민')
        print(response)

    @skip
    def test_chat_completion_view(self):
        service = ChatGPTService()
        response = service.chat_completion('test query', stream=False)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response)
        print(response.choices[0].message.content)
