from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from base.serializers import CustomUserSerializer
from base.models import CustomUser
from base.serializers import CustomTokenRefreshSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class UserRegisterView(APIView):
    def post(self, request):
        email = request.data['email']
        if CustomUser.objects.filter(email=email).exists():
            return Response(status=status.HTTP_306_RESERVED)
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
class UserTokenRefreshView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer

