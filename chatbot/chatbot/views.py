from django.shortcuts import render,HttpResponse
from django.http import JsonResponse

def index(request):
    return HttpResponse("Hello, world. You're at the chatbot index.")