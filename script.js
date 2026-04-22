const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const messages = document.getElementById("messages");

function addMessageBubble(text) {
  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = text;
  messages.prepend(bubble);
}

chatForm.addEventListener("submit", event => {
  event.preventDefault();

  const query = chatInput.value.trim();
  if (!query) {
    return;
  }

  console.log("Submitted query:", query);
  addMessageBubble(query);
  chatInput.value = "";
  chatInput.focus();
});
