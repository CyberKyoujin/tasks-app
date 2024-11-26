from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from base.serializers import TaskSerializer
from base.models import Task
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone


class TaskListView(APIView):
    def get(self, request):
        tasks = Task.objects.all().filter(user=request.user).order_by("priority")
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class TaskCreateView(generics.CreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class TaskCompleteView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        task = Task.objects.get(pk=pk)
        task.is_completed = True
        task.completed_at = timezone.now()
        task.save()
        return Response(status=status.HTTP_200_OK)

class TaskDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    
