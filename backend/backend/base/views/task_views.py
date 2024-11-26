from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from base.serializers import TaskSerializer
from base.models import Task
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone


class TaskListView(APIView):
    def get(self, request, *args, **kwargs):
        tasks = Task.objects.all().order_by("priority")
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class TaskCreateView(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
class TaskCompleteView(APIView):
    def post(self, request, pk, *args, **kwargs):
        task = Task.objects.get(pk=pk)
        task.is_completed = True
        task.completed_at = timezone.now()
        task.save()
        return Response(status=status.HTTP_200_OK)

class TaskDeleteView(generics.DestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    
