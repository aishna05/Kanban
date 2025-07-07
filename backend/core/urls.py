from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, TaskViewSet, export_board_pdf

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('boards/<int:board_id>/export-pdf/', export_board_pdf),
    path('', include(router.urls)),
]
