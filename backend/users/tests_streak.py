from django.test import TestCase
from django.contrib.auth import get_user_model
from posts.models import Post
from django.utils import timezone
from datetime import timedelta
from users.serializers import UserSerializer

User = get_user_model()

class StreakTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(email='test@example.com', password='password')

    def test_zero_streak_no_posts(self):
        serializer = UserSerializer(self.user)
        self.assertEqual(serializer.data['streak'], 0)

    def test_streak_today(self):
        # Post created today
        Post.objects.create(user=self.user, content="Today's post")
        serializer = UserSerializer(self.user)
        self.assertEqual(serializer.data['streak'], 1)

    def test_streak_yesterday(self):
        # Post created yesterday
        yesterday = timezone.now() - timedelta(days=1)
        post = Post.objects.create(user=self.user, content="Yesterday's post")
        post.created_at = yesterday
        post.save()
        
        serializer = UserSerializer(self.user)
        self.assertEqual(serializer.data['streak'], 1)

    def test_streak_broken(self):
        # Post created 2 days ago
        two_days_ago = timezone.now() - timedelta(days=2)
        post = Post.objects.create(user=self.user, content="Old post")
        post.created_at = two_days_ago
        post.save()
        
        serializer = UserSerializer(self.user)
        self.assertEqual(serializer.data['streak'], 0)

    def test_multi_day_streak(self):
        # Post today, yesterday, and day before yesterday
        now = timezone.now()
        
        # Today
        Post.objects.create(user=self.user, content="Today")
        
        # Yesterday
        p2 = Post.objects.create(user=self.user, content="Yesterday")
        p2.created_at = now - timedelta(days=1)
        p2.save()
        
        # Day before yesterday
        p3 = Post.objects.create(user=self.user, content="Day before")
        p3.created_at = now - timedelta(days=2)
        p3.save()
        
        serializer = UserSerializer(self.user)
        self.assertEqual(serializer.data['streak'], 3)

    def test_streak_gap_check(self):
        # Post today and 2 days ago (gap yesterday)
        now = timezone.now()
        
        # Today
        Post.objects.create(user=self.user, content="Today")
        
        # 2 days ago
        p3 = Post.objects.create(user=self.user, content="Day before")
        p3.created_at = now - timedelta(days=2)
        p3.save()
        
        serializer = UserSerializer(self.user)
        self.assertEqual(serializer.data['streak'], 1)
