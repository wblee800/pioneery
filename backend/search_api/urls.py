from django.urls import path
from .views import SearchView, AISearchView

urlpatterns = [
    path('', SearchView.as_view(), name='search'),
    path('ai/', AISearchView.as_view(), name='ai search'),
]