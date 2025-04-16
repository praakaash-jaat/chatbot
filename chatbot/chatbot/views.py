import traceback
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import lmstudio as lms
import ollama
import sys

def index(request):
    print(sys.path)
    return render(request, 'chatbot/index.html')

def lmstudio(request):
    return render(request, 'chatbot/lmstudio.html')

def ollama(request):
    return render(request, 'chatbot/ollama.html')    

@csrf_exempt  # For development only - use proper CSRF protection in production
def chat_api_lmstudio(request):
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


@csrf_exempt
def chat_api_ollama(request):
    try:
        response = ollama.chat(model="gemma3:latest", messages=[
            {"role": "user", "content": "test"}
        ])
        return JsonResponse({'response': "Ollama works!"}) # Just a simple response
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

def uin_fontend(cp_request):
    user_input = ""
    if cp_request.method == 'POST':
        user_input = cp_request.POST.get('user_input')
        return user_input
    return user_input


    