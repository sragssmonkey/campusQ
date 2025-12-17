import os
import json
import firebase_admin
from firebase_admin import credentials

def init_firebase():
    if firebase_admin._apps:
        return

    firebase_json = os.environ.get("FIREBASE_ADMIN_JSON")
    if not firebase_json:
        # Running locally without Firebase admin
        return

    cred = credentials.Certificate(json.loads(firebase_json))
    firebase_admin.initialize_app(cred)
