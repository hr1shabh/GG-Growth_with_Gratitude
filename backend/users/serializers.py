from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'profile', 'id']  # Fields to include in the serializer
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        # Check if the email is already in use
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        # Create a new user using the custom user manager
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            profile=validated_data.get('profile', '')  # Handle optional profile field
        )
        return user