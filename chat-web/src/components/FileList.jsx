import React, { useState } from 'react';
import '../style/FileList.css';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

function FileList({ files, onToggleVisibility }) {
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
    onToggleVisibility();
  };

  return (
    <div className={`file-list-container ${isHidden ? 'hidden' : ''}`}>
      <div className="file-list">
        <h3 className='file-list-h3'>上传的文件</h3>
        <ul className='file-list-ul'>
          {files.map((file) => (
            <li key={file.id}>
              {file.name} ({file.size})
            </li>
          ))}
        </ul>
      </div>
      <button onClick={toggleVisibility} className="file-list-toggle-btn">
        {isHidden ? <IoChevronForward /> : <IoChevronBack />}
      </button>
    </div>
  );
}

export default FileList;