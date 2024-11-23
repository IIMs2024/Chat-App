// Grab elements
const messageInput = document.getElementById('message');
const sendMessageButton = document.getElementById('sendMessage');
const messagesContainer = document.getElementById('messages');

// Send message function
function sendMessage() {
    const messageText = messageInput.value;
    
    if (messageText.trim()) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerText = messageText;

        messagesContainer.appendChild(messageElement);
        messageInput.value = ''; // Clear input
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
    }
}

// Attach event listener to the send button
sendMessageButton.addEventListener('click', sendMessage);

// Allow pressing Enter to send message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
}

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent default prompt
    event.preventDefault();
    deferredPrompt = event;

    // Show a custom "Install" button
    const installButton = document.getElementById("installButton");
    installButton.style.display = "block";

    installButton.addEventListener("click", () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            deferredPrompt = null;
        });
    });
});