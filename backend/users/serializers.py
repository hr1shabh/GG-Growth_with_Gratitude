from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    streak = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['email', 'password', 'profile', 'id', 'streak']  # Fields to include in the serializer
        extra_kwargs = {'password': {'write_only': True}}

    def get_streak(self, obj):
        from django.utils import timezone
        from django.db import models
        
        # Get all post dates for the user, distinct and ordered
        post_dates = obj.posts.annotate(
            date=models.functions.TruncDate('created_at')
        ).values_list('date', flat=True).distinct().order_by('-date')

        if not post_dates:
            return 0

        today = timezone.now().date()
        yesterday = today - timezone.timedelta(days=1)
        
        # Check if the latest post is from today or yesterday
        latest_post_date = post_dates[0]
        
        if latest_post_date != today and latest_post_date != yesterday:
            return 0
            
        streak = 0
        current_date = today 
        
        # Iterative check
        check_date = today
                
        streak_count = 0
        
        # Check if today is present
        if today in post_dates:
            streak_count += 1
            check_date = yesterday
        elif yesterday in post_dates:
             # Streak is valid but today is not posted yet. 
             # The streak count comes from yesterday backwards.
             streak_count += 1
             check_date = yesterday - timezone.timedelta(days=1)
        else:
            return 0
            
        while True:
            if check_date in post_dates:
                streak_count += 1
                check_date -= timezone.timedelta(days=1)
            else:
                break
                
        return streak_count

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