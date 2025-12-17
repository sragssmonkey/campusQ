from firebase_admin import auth
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from users.models import User

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None

        try:
            decoded = auth.verify_id_token(auth_header)
        except Exception:
            raise AuthenticationFailed("Invalid Firebase token")

        user, _ = User.objects.get_or_create(
            firebase_uid=decoded["uid"],
            defaults={
                "username": decoded.get("email", decoded["uid"]),
                "email": decoded.get("email", ""),
            },
        )
        return (user, None)
