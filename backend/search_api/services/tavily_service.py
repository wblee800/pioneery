import logging
from ..utils.tavily_client import TavilyClient, TavilyAPIError
from typing import Dict, Any

logger = logging.getLogger('search_api')


class TavilyService:
    def __init__(self):
        self.client = TavilyClient()

    def search_content(self, query: str) -> Dict[str, Any]:
        """
        주어진 쿼리로 컨텐츠를 검색합니다.
        """
        logger.info(f"Searching content for query: {query}")

        try:
            results = self.client.search(
                query=query,
                search_depth="basic",
                include_images=True,
                max_results=5
            )

            # 비즈니스 요구사항에 맞게 결과 가공
            processed_results = {
                'articles': results.get('results', []),
                'summary': results.get('answer', ''),
                'topic': query
            }

            logger.debug(f"Search completed successfully for query: {query}")
            return processed_results

        except TavilyAPIError as e:
            logger.error(f"Tavily search error for query '{query}': {str(e)}")
            raise
        except Exception as e:
            logger.exception(f"Unexpected error during search for query '{query}'")
            raise