async function askAI(userInput) {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY', {
        method: 'POST',
        body: JSON.stringify({
            contents: [{ parts: [{ text: userInput }] }]
        })
    });
    const data = await response.json();
    console.log(data.candidates[0].content.parts[0].text);
}
