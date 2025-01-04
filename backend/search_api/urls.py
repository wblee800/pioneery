from django.urls import path, include
from .views import (
    SearchView,
    AISearchView,
    ImmigrationAnswerView,
    JobMatchAnswerView,
    SocialNetworkingAnswerView,
    DeveloperSkillsAnswerView,
)

# Search API URL 패턴
# /search/

ai_patterns = [
    path('', AISearchView.as_view(), name='ai search'), # /search/ai/
    path('immigration/', ImmigrationAnswerView.as_view(), name='ai_immigration_answer'), # /search/ai/immigration/
    path('job_match/', JobMatchAnswerView.as_view(), name='ai_job_match_answer'),
    path('networking/', SocialNetworkingAnswerView.as_view(), name='ai_social_network_answer'),
    path('skills/', DeveloperSkillsAnswerView.as_view(), name='ai_developer_skills_answer'),
]

urlpatterns = [
    path('', SearchView.as_view(), name='search'), # /search/
    path('ai/', include((ai_patterns, 'ai'))), # /search/ai/
]
