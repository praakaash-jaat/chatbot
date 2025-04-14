document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    const welcomeScreen = document.getElementById('welcome');
    const chatHistory = document.getElementById('chat-history');
    const newChatButton = document.querySelector('.new-chat');
    const examples = document.querySelectorAll('.example');
    
    let chatMessages = [];
    let chatId = Date.now().toString();
    
    // Auto resize textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Send message on Enter (but allow Shift+Enter for new line)
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Handle example clicks
    examples.forEach(example => {
        example.addEventListener('click', function() {
            userInput.value = this.textContent;
            userInput.dispatchEvent(new Event('input')); // Trigger resize
            sendMessage();
        });
    });
    
    // New chat button
    newChatButton.addEventListener('click', function() {
        startNewChat();
    });
    
    function startNewChat() {
        chatMessages = [];
        chatId = Date.now().toString();
        chatContainer.innerHTML = '';
        welcomeScreen.style.display = 'flex';
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Add to history if previous chat had messages
        updateChatHistory();
    }
    
    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;
        
        // Hide welcome screen if visible
        if (welcomeScreen.style.display !== 'none') {
            welcomeScreen.style.display = 'none';
        }
        
        // Add user message to UI
        addMessageToUI('user', message);
        
        // Add to chat messages array
        chatMessages.push({ role: 'user', content: message });
        
        // Clear input
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Add to history
        updateChatHistory();
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate assistant response after delay
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Generate a response (in a real app, you'd call an API)
            const response = generateResponse(message);
            
            // Add assistant message to UI
            addMessageToUI('assistant', response);
            
            // Add to chat messages array
            chatMessages.push({ role: 'assistant', content: response });
        }, 1000 + Math.random() * 2000); // Random delay to simulate thinking
    }
    
    function addMessageToUI(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = role === 'user' ? 'U' : 'A';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function showTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message assistant typing';
        messageDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.textContent = 'A';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.className = 'typing-indicator';
            dot.style.animationDelay = `${i * 0.2}s`;
            messageContent.appendChild(dot);
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function updateChatHistory() {
        // Only add to history if there are messages
        if (chatMessages.length > 0) {
            // Check if history item already exists
            let historyItem = document.getElementById(`history-${chatId}`);
            
            if (!historyItem) {
                historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.id = `history-${chatId}`;
                
                // Add history item to the top
                if (chatHistory.firstChild) {
                    chatHistory.insertBefore(historyItem, chatHistory.firstChild);
                } else {
                    chatHistory.appendChild(historyItem);
                }
                
                // Add click event to history item
                historyItem.addEventListener('click', function() {
                    // In a real app, you'd load the chat from storage
                    // For now, we'll just update the UI with the stored messages
                    chatContainer.innerHTML = '';
                    welcomeScreen.style.display = 'none';
                    
                    chatMessages.forEach(msg => {
                        addMessageToUI(msg.role, msg.content);
                    });
                });
            }
            
            // Update text to first user message
            let firstUserMessage = chatMessages.find(msg => msg.role === 'user');
            if (firstUserMessage) {
                let truncatedMessage = firstUserMessage.content;
                if (truncatedMessage.length > 30) {
                    truncatedMessage = truncatedMessage.substring(0, 27) + '...';
                }
                historyItem.textContent = truncatedMessage;
            }
        }
    }
    
    function generateResponse(message) {
        // Very simple response generation
        // In a real app, you'd call an API like OpenAI's
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! How can I assist you today?";
        } else if (lowerMessage.includes('who are you')) {
            return "I'm a simple ChatGPT clone built with vanilla JavaScript. I don't have the capabilities of the real ChatGPT, but I'm here to demonstrate the UI.";
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (lowerMessage.includes('quantum')) {
            return "Quantum computing uses quantum bits or qubits which can exist in multiple states simultaneously, unlike classical bits that are either 0 or 1. This property, called superposition, allows quantum computers to process complex calculations much faster for certain types of problems.";
        } else if (lowerMessage.includes('debug') || lowerMessage.includes('python')) {
            return "To debug a Python function effectively, you can use print statements to track variable values, use a debugger like pdb, or try exception handling with try/except blocks. Without seeing your specific code, I'd recommend checking for common issues like indentation errors, variable scope problems, or type inconsistencies.";
        } else if (lowerMessage.includes('birthday') || lowerMessage.includes('gift')) {
            return "Some birthday gift ideas could be: a personalized photo album, an experience like concert tickets, a subscription box related to their interests, a quality item for their hobby, or a smart home device if they're into technology.";
        } else if (lowerMessage.includes('content plan') || lowerMessage.includes('social media')) {
            return "For a social media content plan, consider creating a mix of educational, entertaining, and promotional content. Aim for 70% value-adding content, 20% shared content from others, and 10% promotional. Set up a content calendar, identify your target audience, and maintain a consistent posting schedule.";
        } else {
            return "Thank you for your message. In a real ChatGPT application, I would provide a helpful response based on your input. This demo is just showing how the UI works with vanilla JavaScript.";
        }
    }
});