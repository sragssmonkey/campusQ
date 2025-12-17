from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

def login_page(request):
    return render(request, "login.html")

from rest_framework.views import APIView
from rest_framework.response import Response

def home_page(request):
    return render(request, "home.html")

class SaveFCMToken(APIView):
    def post(self, request):
        request.user.fcm_token = request.data.get("fcm_token")
        request.user.save()
        return Response({"status": "FCM token saved"})
