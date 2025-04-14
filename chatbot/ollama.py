import ollama

def chat_with_ollama(input_font):
    try:    
        response = ollama.generate(model='gemma3:latest', prompt=input_font)
        return response['response']
    except Exception as e:
        print(f"Error processing with ollama: {e}")
        return None
    
def main(input_font):
    output_back = chat_with_ollama(input_font)
    
    if output_back:
        print(f"Input:\n {input_font}")
        print(f"Output:\n {output_back}")
    else:
        print("No response from ollama.")
        
if __name__ == "__main__":
    input_front = "Tell me a very short story." #example input
    main(input_front)
