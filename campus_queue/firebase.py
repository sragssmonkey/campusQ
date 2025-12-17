import os, json
import firebase_admin
from firebase_admin import credentials

FIREBASE_CREDS = os.environ.get("FIREBASE_CREDENTIALS")

if FIREBASE_CREDS:
    cred = credentials.Certificate(json.loads(FIREBASE_CREDS))
else:
    cred = credentials.Certificate( "campusq-d771f-firebase-adminsdk-fbsvc-fca4863db2.json")

firebase_admin.initialize_app(cred)
