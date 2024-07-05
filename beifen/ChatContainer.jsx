import React, { useState, useEffect } from 'react';
import useChat from '../hooks/useChat';
import ChatList from './ChatList';
import ChatBubble from './ChatBubble';
import FileList from './FileList';
import '../style/ChatContainer.css';

function ChatContainer({ currentPage }) {
  // 使用自定义的useChat hook
  const {
    chatSessions,
    activeSession,
    isLoading,
    error,
    fetchSessions,
    createSession,
    deleteSession,
    sendMessage,
    setActiveSession,
    uploadFile,
    getStreamResponse
  } = useChat();

  // 控制聊天列表和文件列表的可见性
  const [isChatListVisible, setIsChatListVisible] = useState(true);
  const [isFileListVisible, setIsFileListVisible] = useState(true);

  // 在组件挂载时获取聊天会话
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // 切换聊天列表可见性
  const toggleChatList = () => setIsChatListVisible(!isChatListVisible);

  // 切换文件列表可见性
  const toggleFileList = () => setIsFileListVisible(!isFileListVisible);

  // 处理会话变更
  const handleSessionChange = (sessionId) => {
    setActiveSession(sessionId);
  };

  // 创建新会话
  const handleCreateNewSession = () => {
    createSession();
  };

  // 获取当前活动会话的消息
  const activeMessages = chatSessions.find(session => session.id === activeSession)?.messages || [];

  return (
    <div className="chat-container">
      <div className={`chat-list-container ${isChatListVisible ? '' : 'hidden'}`}>
        <ChatList 
          sessions={chatSessions}
          activeSession={activeSession}
          onSessionChange={handleSessionChange}
          onCreateNewSession={handleCreateNewSession}
          onToggleVisibility={toggleChatList}
          onDeleteSession={deleteSession}
        />
      </div>
      <div className="chat-messages">
        {!isChatListVisible && (
          <button className="toggle-chat-list" onClick={toggleChatList}>显示聊天列表</button>
        )}
        {activeMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        {/* 这里可以添加发送消息的输入框和按钮 */}
      </div>
      {currentPage === 'RAG_chat' && (
        <div className={`file-list-container ${isFileListVisible ? '' : 'hidden'}`}>
          <FileList 
            onToggleVisibility={toggleFileList}
            onUploadFile={uploadFile}
          />
        </div>
      )}
      {currentPage === 'RAG_chat' && !isFileListVisible && (
        <button className="toggle-file-list" onClick={toggleFileList}>显示文件列表</button>
      )}
      {isLoading && <div>加载中...</div>}
      {error && <div>错误：{error}</div>}
    </div>
  );
}

export default ChatContainer;