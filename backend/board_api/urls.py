from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet

# Router 생성
router = DefaultRouter()
router.register('posts', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
]
