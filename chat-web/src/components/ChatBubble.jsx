import React from 'react';
import '../style/ChatBubble.css';

function ChatBubble({ message }) {
  const bubbleClass = message.sender === 'user' ? 'user-bubble' : 'ai-bubble';

  return (
    <div className={`chat-bubble ${bubbleClass}`}>
      <div className="message-content">{message.content}</div>
      <div className="message-time">{formatTime(message.timestamp || new Date())}</div>
    </div>
  );
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default ChatBubble;