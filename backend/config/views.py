from django.http import JsonResponse

def health_check(request):
    """
    Lightweight endpoint to keep the server awake and verify its status.
    Does not hit the database to minimize resource usage.
    """
    return JsonResponse({"status": "awake", "message": "GG Backend is running"})
