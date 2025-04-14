from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import lmstudio as lms

def index(request):
    output_backend = chat_with_lms("write a story?")
    output_backend = str(output_backend)
    return render(request, 'chatbot/index.html', {'message': output_backend})

def chat_with_lms(input_fontend):
    model = lms.llm("qwen2.5-coder-3b-instruct")
    output_backend = model.respond(input_fontend)
    return output_backend
    


