from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('board/', include('backend.board.urls')),  # board 앱의 URL 연결
    path('api/board/', include('backend.board_api.urls')),  # board API 경로
    path('api/search/', include('backend.search_api.urls')),  # search API 경로 추가
    path('', TemplateView.as_view(template_name='index.html')),
]
