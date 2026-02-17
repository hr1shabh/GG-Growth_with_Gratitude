from django.urls import path
from .views import register_user, get_user_profile, get_user_by_id, GoogleLogin

#url patterns for users
urlpatterns = [
    path('register/', register_user, name='register'),
    path('profile/', get_user_profile, name='profile'),
    path('userprofile/<int:user_id>/', get_user_by_id, name='user-detail'),
    path('google/', GoogleLogin.as_view(), name='google_login'),
]


