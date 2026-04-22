// PASTE YOUR KEY INSIDE THE QUOTES BELOW
const apiKey = "AIzaSyDfYCyPsy4byyOjCpXg_jOnT-wgqHTFark"; 

const chatInput = document.querySelector("#user-input");
const sendButton = document.querySelector("#send-btn");
const chatWindow = document.querySelector("#chat-window");

async function getAIResponse() {
    const userMessage = chatInput.value;
    if (!userMessage) return;

    // Add your message to the screen
    appendMessage(userMessage, "user-message");
    chatInput.value = "";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        // Add AI response to the screen
        appendMessage(aiText, "ai-message");

    } catch (error) {
        appendMessage("Error: Check your API key or connection.", "ai-message");
        console.error(error);
    }
}

function appendMessage(text, className) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

sendButton.addEventListener("click", getAIResponse);
chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") getAIResponse();
});
