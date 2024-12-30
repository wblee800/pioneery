import logging

from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer

logger = logging.getLogger('board_api')


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')  # 작성일 내림차순 정렬
    serializer_class = PostSerializer
