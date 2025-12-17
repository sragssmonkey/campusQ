from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    firebase_uid = models.CharField(max_length=128, unique=True)
    role = models.CharField(
        max_length=10,
        choices=[
            ("student", "Student"),
            ("staff", "Staff"),
            ("admin", "Admin"),
        ],
        default="student",
    )
    fcm_token = models.TextField(blank=True, null=True)
