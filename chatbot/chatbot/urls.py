from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path("admin/", admin.site.urls), 
    path('', views.index, name='index'),
    path('lmstudio/', views.lmstudio, name='lmstudio'),
    path('ollama/', views.ollama, name='ollama'),
    path('api/chat_lmstudio/', views.chat_api_lmstudio, name='chat_api_lmstudio'),
    path('api/chat_ollama/', views.chat_api_ollama, name='chat_api_ollama'),
]