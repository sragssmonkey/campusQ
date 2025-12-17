import os
import json
import firebase_admin
from firebase_admin import credentials

if not firebase_admin._apps:
    firebase_admin.initialize_app(
        credentials.Certificate(
            json.loads(os.environ["FIREBASE_ADMIN_JSON"])
        )
    )
