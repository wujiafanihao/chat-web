import React, { useState } from 'react';
import UploadModal from './UploadModal';
import '../style/InputBox.css';
import { IoSend, IoCloudUpload } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

function InputBox({ currentPage }) {
  const [input, setInput] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState('default');

  const handleSend = () => {
    // Implement send message logic
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  return (
    <div className="input-box">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend} className="send-btn">
        <IoSend />
      </button>
      {currentPage === 'RAG_chat' && (
        <button onClick={handleUpload} className="upload-btn">
          <IoCloudUpload />
        </button>
      )}
      <div className="select-wrapper">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
          <option value="gpt-4o">gpt-4o</option>
          <option value="kimi">kimi</option>
          <option value="deepseekV2">deepseekV2</option>
          <option value="llm_fake_openai">llm_fake_openai</option>
          <option value="ollama">ollama</option>
        </select>
        <IoMdArrowDropdown className="select-icon" />
      </div>
      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
}

export default InputBox;