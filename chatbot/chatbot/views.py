from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
import lmstudio as lms

def index(request):
    # This now just renders the template without processing any data
    return render(request, 'chatbot/index.html')

@csrf_exempt  # For development only - use proper CSRF protection in production
def chat_api(request):
    if request.method == 'POST':
        user_input = request.POST.get('user_input')
        if user_input:
            # Process with LMStudio
            model = lms.llm("qwen2.5-coder-3b-instruct")
            response = model.respond(user_input)
            return JsonResponse({'response': str(response)})
        else:
            return JsonResponse({'response': 'No input provided'})
    return JsonResponse({'response': 'Invalid request method'})

# Your previous functions which are now separated into two endpoints
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