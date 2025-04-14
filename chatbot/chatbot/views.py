from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
from ollama import chat, ChatResponse
import json
from django.views.decorators.csrf import csrf_exempt
import asyncio
from . import ollama

def index(request):
    return render(request, 'chatbot/index.html')

