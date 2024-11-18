from django.urls import path
from base.views.user_views import UserListView, UserTokenObtainPairView, UserRegisterView

urlpatterns = [
    path('', UserListView.as_view(), name="user-list"),
    path('register/', UserRegisterView.as_view(), name="user-register"),
    path('login/', UserTokenObtainPairView.as_view(), name="user-login"),
]