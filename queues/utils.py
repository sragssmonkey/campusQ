def calculate_eta(service, token_number):
    from .models import Token

    waiting_before = Token.objects.filter(
        service=service,
        status="waiting",
        token_number__lt=token_number
    ).count()

    return waiting_before * service.avg_service_time
