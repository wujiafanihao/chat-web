import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatBubble from './ChatBubble';
import FileList from './FileList';
import '../style/ChatContainer.css';

function ChatContainer({ currentPage }) {
  const [isChatListVisible, setIsChatListVisible] = useState(true);
  const [isFileListVisible, setIsFileListVisible] = useState(true);
  const [activeSession, setActiveSession] = useState(1);
  const [chatSessions, setChatSessions] = useState([
    { 
      id: 1, 
      name: "Chat 1",
      messages: [
        { id: 1, content: "Welcome to Chat 1!", sender: 'ai' },
        { id: 2, content: "Hi, this is my first message in Chat 1.", sender: 'user' },
      ]
    },
    { 
      id: 2, 
      name: "Chat 2",
      messages: [
        { id: 1, content: "Welcome to Chat 2!", sender: 'ai' },
        { id: 2, content: "Hello, I'm in Chat 2 now.", sender: 'user' },
      ]
    },
  ]);
  const [files, setFiles] = useState([
    { id: 1, name: "document1.pdf", size: "1.2 MB" },
    { id: 2, name: "image.jpg", size: "500 KB" },
  ]);
  
  const toggleChatList = () => setIsChatListVisible(!isChatListVisible);
  const toggleFileList = () => setIsFileListVisible(!isFileListVisible);

  const handleSessionChange = (sessionId) => {
    setActiveSession(sessionId);
  };

  const createNewSession = () => {
    const newSessionId = chatSessions.length + 1;
    const newSession = {
      id: newSessionId,
      name: `Chat ${newSessionId}`,
      messages: []
    };
    setChatSessions([...chatSessions, newSession]);
    setActiveSession(newSessionId);
  };

  const activeMessages = chatSessions.find(session => session.id === activeSession)?.messages || [];

  return (
    <div className="chat-container">
      <div className={`chat-list-container ${isChatListVisible ? '' : 'hidden'}`}>
        <ChatList 
          sessions={chatSessions}
          activeSession={activeSession}
          onSessionChange={handleSessionChange}
          onCreateNewSession={createNewSession}
          onToggleVisibility={toggleChatList}
        />
      </div>
      <div className="chat-messages">
        {!isChatListVisible && (
          <button className="toggle-chat-list" onClick={toggleChatList}>Show Chat List</button>
        )}
        {activeMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
      </div>
      {currentPage === 'RAG_chat' && (
        <div className={`file-list-container ${isFileListVisible ? '' : 'hidden'}`}>
          <FileList 
            files={files}
            onToggleVisibility={toggleFileList}
          />
        </div>
      )}
      {currentPage === 'RAG_chat' && !isFileListVisible && (
        <button className="toggle-file-list" onClick={toggleFileList}>Show File List</button>
      )}
    </div>
  );
}

export default ChatContainer;