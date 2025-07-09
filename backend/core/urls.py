from django.urls import path
from .views import RegisterView, BoardList, TaskViewSet, TaskUpdateView, export_board_pdf

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('boards/', BoardList.as_view()),
    path('tasks/', TaskViewSet.as_view()),
    path('tasks/<int:pk>/', TaskUpdateView.as_view()),
    path('boards/<int:id>/export-pdf/', export_board_pdf),
]
