from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Board(models.Model):
    title = models.CharField(max_length=100, default='New Board')
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Column(models.Model):
    name = models.CharField(max_length=50, default='New Column')
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='columns')
    position = models.IntegerField(default=0)

class Task(models.Model):
    title = models.CharField(max_length=100, default='New Task')
    description = models.TextField(blank=True, default='')
    column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name='tasks')
    position = models.IntegerField(default=0)