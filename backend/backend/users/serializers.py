from rest_framework import serializers
from .models import User  # Import your custom User model instead

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'profile']  # Update fields to match your custom model
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Update create method to match your custom user manager
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            profile=validated_data.get('profile', '')
        )
        return user