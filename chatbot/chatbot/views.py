from django.shortcuts import render,HttpResponse
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import lmstudio as lms


def index(request):
    cp_request = request
    user_input = uin_fontend(cp_request)
    output_backend = chat_with_lms(user_input)
    output_backend = str(output_backend)
    return render(request, 'chatbot/index.html', {'message': output_backend})

def uin_fontend(cp_request):
    user_input = ""
    if cp_request.method == 'POST':
        user_input = cp_request.POST.get('user_input')
        return user_input
    return user_input

def chat_with_lms(input_fontend):
    model = lms.llm("qwen2.5-coder-3b-instruct")
    output_backend = model.respond(input_fontend)
    return output_backend


    


