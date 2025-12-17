"""
URL configuration for campus_queue project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib import admin
from django.urls import path,include
from queues.views import TakeToken, CallNext

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/take-token/<int:service_id>/", TakeToken.as_view()),
    path("api/call-next/<int:service_id>/", CallNext.as_view()),
    path("", include("users.urls")),
    path("", include("queues.urls")),

]
