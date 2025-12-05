# Gemini AI Chatbot

A simple, modern, and customizable web-based chatbot powered by the Google Gemini API. This project includes a Node.js + Express backend and a clean, responsive Vanilla JavaScript frontend.

## ✨ Features

-   **Direct Gemini Integration**: Connects directly to the Gemini API for powerful conversational AI.
-   **Modern Frontend**: A sleek and responsive chat interface built with Vanilla JS, HTML, and CSS.
-   **Light/Dark Mode**: A theme toggle to switch between light and dark modes, with the user's preference saved locally.
-   **Animated UI**: Smooth animations for incoming messages and a dynamic, animated background gradient.
-   **Markdown Rendering**: The bot's responses are parsed as Markdown, allowing for rich formatting like lists, code blocks, and bold/italic text.
-   **Typing Indicator**: A clean, animated typing indicator lets the user know when the bot is "thinking".
-   **Easy to Customize**: The project is built with clear, separated concerns, making it easy to modify the frontend or backend.

## 🛠️ Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/abdulrohman19/gemini-chatbot-api
    cd gemini-chatbot-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a `.env` file in the root of the project and add your Google Gemini API key:
    ```env
    GEMINI_API_KEY=your_gemini_api_key_here
    ```

## 🚀 Running the App

To start the server, run the following command:

```bash
npm start
```
_Note: If you haven't added a `start` script, you can run `node index.js`._

The server will start on `http://localhost:3000`. Open this URL in your web browser to use the chatbot.

## 🤖 API Endpoint

The backend provides a single API endpoint to handle the chat logic.

### `POST /api/chat`

-   **Description**: Sends a conversation to the Gemini API and receives a response.
-   **Request Body**:
    ```json
    {
      "conversation": [
        { "role": "user", "text": "<user_message>" }
      ]
    }
    ```
-   **Success Response (200)**:
    ```json
    {
      "result": "<gemini_ai_response>"
    }
    ```
-   **Error Response (500)**:
    ```json
    {
      "error": "<error_message>"
    }
    ```

## 📂 Project Structure

```
.
├── .env                # Environment variables (contains API key)
├── index.js            # Backend server (Express)
├── package.json        # Project dependencies and scripts
└── public/
    ├── index.html      # Main HTML file for the frontend
    ├── style.css       # All styles for the frontend
    └── script.js       # Frontend JavaScript logic
```
