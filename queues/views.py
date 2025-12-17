from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from queues.models import Service, Token
from notifications.fcm import send_fcm_notification
from queues.utils import calculate_eta
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import now
from queues.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from queues.models import Service, Token

class QueueStatus(APIView):
    def get(self, request, service_id):
        try:
            service = Service.objects.get(id=service_id)
        except Service.DoesNotExist:
            return Response({"error": "Service not found"}, status=404)

        current_token = (
            Token.objects
            .filter(service=service, status="called")
            .order_by("-called_at")
            .first()
        )

        waiting_tokens = Token.objects.filter(
            service=service,
            status="waiting"
        ).order_by("token_number")

        response = {
            "service": service.name,
            "current_token": current_token.token_number if current_token else None,
            "waiting_count": waiting_tokens.count(),
            "avg_service_time_sec": service.avg_service_time,
            "waiting_tokens": [
                {
                    "token_number": t.token_number,
                    "user_id": t.user.id
                }
                for t in waiting_tokens
            ]
        }

        return Response(response)

class MarkServed(APIView):
    def post(self, request, token_id):
        if request.user.role != "staff":
            return Response({"error": "Unauthorized"}, status=403)

        try:
            token = Token.objects.get(id=token_id, status="called")
        except Token.DoesNotExist:
            return Response({"error": "Invalid token"}, status=404)

        service = token.service
        service_time = (now() - token.called_at).seconds

        # 🔥 YOUR CODE GOES HERE
        alpha = 0.2
        service.avg_service_time = int(
            alpha * service_time + (1 - alpha) * service.avg_service_time
        )
        service.save()

        token.status = "served"
        token.served_at = now()
        token.save()

        return Response({
            "message": "Token marked as served",
            "service_time_sec": service_time,
            "new_avg_service_time": service.avg_service_time,
        })

class TakeToken(APIView):
    def post(self, request, service_id):
        service = Service.objects.get(id=service_id)
        eta_seconds = calculate_eta(service, next_number)

        last_token = Token.objects.filter(service=service).order_by("-token_number").first()
        next_number = last_token.token_number + 1 if last_token else 1

        token = Token.objects.create(
            service=service,
            user=request.user,
            token_number=next_number,
        )
        existing = Token.objects.filter(
            service=service,
            user=request.user,
            status="waiting"
        ).exists()

        if existing:
            return Response(
                {"error": "You already have an active token"},
                status=400
            )
        return Response({
            "token": token.token_number,
            "status": token.status,
            "eta_minutes": round(eta_seconds / 60),
        })


class CallNext(APIView):
    def post(self, request, service_id):
        if request.user.role != "staff":
            return Response({"error": "Unauthorized"}, status=403)

        token = Token.objects.filter(
            service_id=service_id,
            status="waiting"
        ).order_by("token_number").first()

        if not token:
            return Response({"message": "No tokens in queue"})

        token.status = "called"
        token.save()

        send_fcm_notification(token.user.fcm_token, token.token_number)

        return Response({"called_token": token.token_number})
