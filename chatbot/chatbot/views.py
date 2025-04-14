from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import lmstudio as lms

def index(request):
    massage = chat_with_lms("Hello, how are you?")
    context = {'massage': massage}
    return render(request, 'chatbot/index.html' , context)

def chat_with_lms(input_font):
    model = lms.llm("qwen2.5-coder-3b-instruct")
    result = model.respond("What is the meaning of life?")
    return result
    


