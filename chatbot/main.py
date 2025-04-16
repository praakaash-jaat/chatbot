from ollama import generate

response = generate(model='gemma3:latest', prompt='very very short answer what is capital of india?')   

print(response['response'])