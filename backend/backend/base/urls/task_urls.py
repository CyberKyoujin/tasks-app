from django.urls import path, include
from base.views.task_views import TaskListView, TaskCreateView, TaskDeleteView, TaskCompleteView


urlpatterns = [
    path('', TaskListView.as_view(), name='tasks-list'),
    path('create/', TaskCreateView.as_view(), name='task-create'),
    path('complete/<int:pk>/', TaskCompleteView.as_view(), name='task-complete'),
    path('delete/<int:pk>/', TaskDeleteView.as_view(), name='task-delete'),
]
