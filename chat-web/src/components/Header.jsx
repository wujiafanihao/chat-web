import React from 'react';
import '../style/Header.css';

function Header({ currentPage, setCurrentPage }) {
  return (
    <header className="header">
      <nav>
        <button
          className={currentPage === 'RAG_chat' ? 'active' : ''}
          onClick={() => setCurrentPage('RAG_chat')}
        >
          RAG_chat
        </button>
        <button
          className={currentPage === 'common_chat' ? 'active' : ''}
          onClick={() => setCurrentPage('common_chat')}
        >
          common_chat
        </button>
      </nav>
    </header>
  );
}

export default Header;