import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services.tavily_service import TavilyService, TavilyAPIError

logger = logging.getLogger('search_api')


class SearchView(APIView):
    def __init__(self):
        super().__init__()
        self.tavily_service = TavilyService()

    def get(self, request):
        """
        웹 컨텐츠 검색 API 엔드포인트
        """
        query = request.query_params.get('q')

        if not query:
            logger.warning("Search request received without query parameter")
            return Response(
                {'error': 'Query parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        logger.info(f"Received search request for query: {query}")

        try:
            results = self.tavily_service.search_content(query)
            logger.info(f"Successfully processed search request for query: {query}")
            return Response(results)

        except TavilyAPIError as e:
            logger.error(f"Tavily API error for query '{query}': {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            logger.exception(f"Unexpected error processing request for query '{query}'")
            return Response(
                {'error': 'An unexpected error occurred'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
