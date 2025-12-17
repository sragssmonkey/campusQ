from firebase_admin import messaging

def send_fcm_notification(fcm_token, token_number):
    if not fcm_token:
        return

    message = messaging.Message(
        notification=messaging.Notification(
            title="Your turn is here!",
            body=f"Token {token_number} is being called.",
        ),
        token=fcm_token,
    )
    messaging.send(message)
