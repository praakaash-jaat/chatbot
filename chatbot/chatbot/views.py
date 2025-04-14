from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import lmstudio as lms

def index(request):
    output_back = chat_with_lms("Hello, how are you?")
    data = {'message': output_back}
    data = str(data)
    data = json.loads(data)
    return HttpResponse(data)

def chat_with_lms(input_font):
    model = lms.llm("qwen2.5-coder-3b-instruct")
    result = model.respond("What is the meaning of life?")
    return result
    


