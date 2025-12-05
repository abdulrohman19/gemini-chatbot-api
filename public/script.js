document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Theme Switching Logic ---
    // Apply the cached theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '🌙';
        } else {
            localStorage.removeItem('theme');
            themeToggle.textContent = '☀️';
        }
    });
    // --- End of Theme Switching Logic ---

    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // Helper to add a new user message
    const addUserMessage = (text) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'user-message');
        messageElement.textContent = text;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    // Helper to add a new bot message placeholder and return it
    const addBotMessagePlaceholder = () => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'bot-message');
        messageElement.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        // Make the placeholder bubble only as wide as the indicator
        messageElement.style.width = 'fit-content';
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
        return messageElement;
    };

    // Helper to update a bot message with final, Markdown-parsed content
    const updateBotMessage = (element, markdownText) => {
        // Use marked.parse to render Markdown from the AI response.
        element.style.width = null; // Reset width
        element.innerHTML = marked.parse(markdownText);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMessage = userInput.value.trim();

        if (!userMessage) {
            return;
        }

        addUserMessage(userMessage);
        userInput.value = '';

        const botMessageElement = addBotMessagePlaceholder();

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    conversation: [{ role: 'user', text: userMessage }],
                }),
            });

            if (!response.ok) {
                botMessageElement.textContent = 'Failed to get response from server.';
                return;
            }

            const data = await response.json();

            if (data && data.result) {
                updateBotMessage(botMessageElement, data.result);
            } else {
                botMessageElement.textContent = 'Sorry, no response received.';
            }
        } catch (error) {
            console.error('Error fetching chat response:', error);
            botMessageElement.textContent = 'Failed to get response from server.';
        }
    });
});