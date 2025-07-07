from django.shortcuts import render
from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Board, Column, Task
from .serializers import RegisterSerializer, BoardSerializer, TaskSerializer
from django.http import HttpResponse
from reportlab.pdfgen import canvas

# Register view
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# Task viewset
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

# PDF Export View
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def export_board_pdf(request, board_id):
    board = Board.objects.prefetch_related('columns__tasks').get(id=board_id)
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="board_{board_id}.pdf"'
    p = canvas.Canvas(response)
    y = 800
    p.drawString(100, y, f"Board: {board.name}")
    for col in board.columns.all():
        y -= 30
        p.drawString(100, y, f"Column: {col.name}")
        for task in col.tasks.all():
            y -= 20
            p.drawString(120, y, f"- {task.title}")
    p.showPage()
    p.save()
    return response
