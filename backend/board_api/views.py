from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer

class PostViewSet(ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')  # 작성일 내림차순 정렬
    serializer_class = PostSerializer