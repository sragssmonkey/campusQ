from django.urls import path
from .views import QueueStatus, TakeToken, CallNext, MarkServed
from django.shortcuts import render
urlpatterns = [
    path("api/take-token/<int:service_id>/", TakeToken.as_view()),
    path("api/call-next/<int:service_id>/", CallNext.as_view()),
    path("api/queue-status/<int:service_id>/", QueueStatus.as_view()),
    path("api/mark-served/<int:token_id>/", MarkServed.as_view()),
    
    path("services/", lambda r: render(r, "services.html")),
    path("staff/", lambda r: render(r, "staff_dashboard.html")),
]


