import React, { useState } from 'react';
import '../style/ChatList.css';
import { IoAdd, IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

function ChatList({ sessions, activeSession, onSessionChange, onCreateNewSession, onDeleteSession }) {
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const handleDeleteClick = (e, sessionId) => {
    e.stopPropagation();
    onDeleteSession(sessionId);
  };

  return (
    <div className={`chat-list-container ${isHidden ? 'hidden' : ''}`}>
      <div className="chat-list">
        <button onClick={onCreateNewSession} className="new-session-btn">
          <IoAdd /> New Chat
        </button>
        <h3 className='chat-list-h3'>Chat Sessions</h3>
        <ul className='chat-list-ul'>
          {sessions.map((session) => (
            <li 
              key={session.id} 
              className={session.id === activeSession ? 'active' : ''}
              onClick={() => onSessionChange(session.id)}
            >
              <span className="session-name">{session.name}</span>
              <button 
                className="delete-session-btn"
                onClick={(e) => handleDeleteClick(e, session.id)}
              >
                <IoClose />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={toggleVisibility} className="chat-list-toggle-btn">
        {isHidden ? <IoChevronForward /> : <IoChevronBack />}
      </button>
    </div>
  );
}

export default ChatList;