import logging
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import StreamingHttpResponse
from .services.tavily_service import TavilyService, TavilyAPIError
from .services.chatgpt_service import ChatGPTService

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


class AISearchView(APIView):
    def __init__(self):
        super().__init__()
        self.chatgpt_service = ChatGPTService()

    def post(self, request):
        query = request.data.get('q')
        stream = request.data.get('stream', False)

        if not query:
            logger.warning("Chat completion request received without query parameter")
            return Response(
                {'error': 'Query parameter is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        logger.info(f"Received chat completion request for query: {query}")

        try:
            if stream:
                response = self.chatgpt_service.chat_completion(query, stream=True)

                def stream_response(response):
                    for chunk in response:
                        dumps = json.dumps({'content': chunk.choices[0].delta.content}, ensure_ascii=False)
                        yield f"data: {dumps}\n\n"
                    yield "data: [DONE]\n\n"

                return StreamingHttpResponse(
                    stream_response(response),
                    content_type='text/event-stream'
                )
            else:
                response = self.chatgpt_service.chat_completion(query, stream=False)
                return Response({
                    'content': response.choices[0].message.content,
                })

        except Exception as e:
            logger.exception(f"Unexpected error processing chat completion request for query '{query}'")
            return Response(
                {'error': 'An unexpected error occurred'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class BaseAnswerView(APIView):
    """
    기본 AI 답변을 생성하는 API 뷰 (재사용 가능한 로직 포함)
    """

    def __init__(self, content_file):
        super().__init__()
        self.chatgpt_service = ChatGPTService()
        with open(content_file, 'r', encoding='utf-8') as file:
            self.reference_content = file.read()

    def post(self, request):
        try:
            # 요청 데이터에서 질문과 스트림 옵션 추출
            stream = request.data.get('stream', False)

            # 적절한 프롬프트 구성 (유저 정보 포함)
            prompt_file = "backend/resources/prompts/query_prompt.txt"
            with open(prompt_file, 'r', encoding='utf-8') as file:
                prompt = file.read()

            prompt = prompt.format(
                reference_content=self.reference_content
            )

            if stream:
                # 스트림 활성화
                ai_response = self.chatgpt_service.chat_completion(prompt, stream=True)

                def stream_response(response):
                    for chunk in response:
                        dumps = json.dumps({'content': chunk.choices[0].delta.content}, ensure_ascii=False)
                        yield f"data: {dumps}\n\n"
                    yield "data: [DONE]\n\n"

                return StreamingHttpResponse(
                    stream_response(ai_response),
                    content_type='text/event-stream'
                )
            else:
                # 일반 응답
                ai_response = self.chatgpt_service.chat_completion(prompt, stream=False)
                return Response({'content': ai_response.choices[0].message.content})

        except Exception as e:
            logger.exception("Unexpected error occurred during AI response generation")
            return Response(
                {'error': 'An unexpected error occurred'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ImmigrationAnswerView(BaseAnswerView):
    """
    이민정보 AI 답변 생성 API
    """

    def __init__(self):
        super().__init__(content_file="backend/resources/immigration.md")


class JobMatchAnswerView(BaseAnswerView):
    """
    직업정보 AI 답변 생성 API
    """

    def __init__(self):
        super().__init__(content_file="backend/resources/job_match.md")


class SocialNetworkingAnswerView(BaseAnswerView):
    """
    네트워킹 AI 답변 생성 API
    """

    def __init__(self):
        super().__init__(content_file="backend/resources/social_network.md")


class DeveloperSkillsAnswerView(BaseAnswerView):
    """
    개발자 취업 필요 기술 AI 답변 생성 API
    """

    def __init__(self):
        super().__init__(content_file="backend/resources/skills.md")
