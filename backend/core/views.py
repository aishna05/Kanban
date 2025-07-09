from rest_framework import generics, permissions
from .models import Board, Column, Task
from .serializers import UserSerializer, BoardSerializer, ColumnSerializer, TaskSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from reportlab.pdfgen import canvas
import io
from django.http import FileResponse

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

class BoardList(generics.ListCreateAPIView):
    serializer_class = BoardSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Board.objects.filter(owner=self.request.user)
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskViewSet(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class TaskUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def export_board_pdf(request, id):
    board = get_object_or_404(Board, id=id, owner=request.user)
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer)
    p.setFont("Helvetica-Bold", 16)
    p.drawString(100, 800, f"Board: {board.title}")
    y = 770
    for col in board.columns.all().order_by('position'):
        p.setFont("Helvetica-Bold", 12)
        p.drawString(50, y, col.name)
        y -= 20
        for task in col.tasks.all().order_by('position'):
            p.setFont("Helvetica", 10)
            p.drawString(70, y, f"- {task.title}: {task.description}")
            y -= 15
        y -= 10
    p.showPage()
    p.save()
    buffer.seek(0)
    return FileResponse(buffer, as_attachment=True, filename='board.pdf')