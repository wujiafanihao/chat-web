import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../style/ChatBubble.css';

function ChatBubble({ message }) {
  const bubbleClass = message.sender === 'user' ? 'user-bubble' : 'ai-bubble';

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(children[0]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return !inline ? (
      <div className="code-block-wrapper">
        <button className="copy-button" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  return (
    <div className={`chat-bubble ${bubbleClass}`}>
      <div className="message-content">
        <ReactMarkdown
          components={{
            code: CodeBlock,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
      <div className="message-time">{formatTime(message.timestamp || new Date())}</div>
    </div>
  );
}

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default ChatBubble;