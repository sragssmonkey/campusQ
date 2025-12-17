from django.db import models

# Create your models here.
from django.db import models
from users.models import User

from rest_framework.views import APIView
from rest_framework.response import Response


from django.db import models
from users.models import User

class Service(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    is_open = models.BooleanField(default=True)
    avg_service_time = models.IntegerField(default=120)

    def __str__(self):
        return self.name


class Token(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    token_number = models.IntegerField()
    status = models.CharField(
        max_length=10,
        choices=[
            ("waiting", "Waiting"),
            ("called", "Called"),
            ("served", "Served"),
            ("cancelled", "Cancelled"),
        ],
        default="waiting",
    )
    called_at = models.DateTimeField(null=True, blank=True)
    served_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
