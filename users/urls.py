from django.urls import path
from .views import login_page
from .views import SaveFCMToken
from .views import home_page
urlpatterns = [
    path("login/", login_page, name="login"),
    path("api/save-fcm-token/", SaveFCMToken.as_view()),
    path("", home_page, name="home"),  
]
