from rest_framework import serializers
from .models import CustomUser, Task
from django.contrib.auth import get_user_model
# Simple JWT 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken

# Model serializers

class CustomUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)
    

    

class TaskSerializer(serializers.ModelSerializer):
    is_missed = serializers.BooleanField(read_only=True)
    due_date = serializers.DateField(
        format="%d-%m-%y",
        required=False,
        input_formats=['%d-%m-%y', '%Y-%m-%d']
    )
    completed_at = serializers.DateField(
        format="%d-%m-%y",
        required=False,
        input_formats=['%d-%m-%y', '%Y-%m-%d']
    )

    class Meta:
        model = Task
        fields = "__all__"


# JWT serializers

class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = RefreshToken(attrs['refresh'])
        user = get_user_model().objects.get(id=refresh['user_id'])

        access = AccessToken.for_user(user)

        access['id'] = user.id
        access['email'] = user.email
        access['username'] = user.username
        access['date_joined'] = user.date_joined.strftime("%d-%m-%Y")
        access['tasks'] = user.tasks.count()
        
        data['access'] = str(access)

        return data    
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        token['email'] = user.email
        token['username'] = user.username
        token['date_joined'] = user.date_joined.strftime("%d-%m-%Y")
        token['tasks'] = user.tasks.count()

        return token