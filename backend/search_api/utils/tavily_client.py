import os
from typing import Dict, Any, Optional
from django.conf import settings
from django.core.cache import cache
import requests


class TavilyClient:
    """Tavily API 클라이언트"""

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.TAVILY_API_KEY
        if not self.api_key:
            raise ValueError("TAVILY_API_KEY must be set in .env_local file or provided explicitly")
        self.base_url = "https://api.tavily.com"

    def search(self,
               query: str,
               search_depth: str = "basic",
               include_images: bool = False,
               include_answer: bool = True,
               max_results: int = 5,
               cache_timeout: int = 3600) -> Dict[str, Any]:
        """
        Tavily 검색 API를 호출합니다.
        """
        # 캐시 키 생성
        cache_key = f"tavily_search_{hash(f'{query}{search_depth}{include_images}{include_answer}{max_results}')}"

        # 캐시된 결과가 있으면 반환
        cached_result = cache.get(cache_key)
        if cached_result:
            return cached_result

        # API 요청 데이터 준비
        endpoint = f"{self.base_url}/search"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "query": query,
            "search_depth": search_depth,
            "include_images": include_images,
            "include_answer": include_answer,
            "max_results": max_results
        }

        try:
            # API 호출
            response = requests.post(endpoint, headers=headers, json=data)
            response.raise_for_status()
            result = response.json()

            # 결과 캐싱
            cache.set(cache_key, result, cache_timeout)

            return result

        except requests.exceptions.RequestException as e:
            raise TavilyAPIError(f"Tavily API 호출 중 오류 발생: {str(e)}")


class TavilyAPIError(Exception):
    """Tavily API 관련 예외"""
    pass