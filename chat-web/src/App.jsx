import React, { useState } from 'react';
import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import InputBox from './components/InputBox';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('RAG_chat');

  return (
    <div className="app">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        <ChatContainer currentPage={currentPage} />
      </main>
      <footer>
        <InputBox currentPage={currentPage} />
      </footer>
    </div>
  );
}

export default App;