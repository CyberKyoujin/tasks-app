from django.urls import path
from base.views.user_views import UserListView

urlpatterns = [
    path('', UserListView.as_view(), name="user-list"),
]