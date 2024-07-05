import React, { useState } from 'react';
import { IoClose, IoCloudUpload, IoSave, IoArchive, IoChevronUpCircleSharp } from "react-icons/io5";
import '../style/UploadModal.css'

const UploadModal = ({ onClose }) => {
  const [embeddingModel, setEmbeddingModel] = useState('text-embedding-ada-002');
  const [knowledgeBaseName, setKnowledgeBaseName] = useState('');
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    // Implement file upload logic
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose}></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50 w-11/12 max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Upload File</h2>
          <button className="text-gray-500 hover:text-gray-700 transition-colors" onClick={onClose}>
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Embedding Model</h3>
            <div className="relative">
              <IoArchive className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={embeddingModel}
                onChange={(e) => setEmbeddingModel(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              >
                <option value="text-embedding-ada-002">text-embedding-ada-002</option>
                <option value="text-embedding-3-small">text-embedding-3-small</option>
                <option value="text-embedding-3-large">text-embedding-3-large</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-1">Set Knowledge Base Name</h3>
            <div className="relative">
              <IoSave className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={knowledgeBaseName}
                onChange={(e) => setKnowledgeBaseName(e.target.value)}
                placeholder="Knowledge Base Name"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              />
            </div>
          </div>
          <div className="text-center mb-4">
            <IoCloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <input
              type="file"
              id="file-upload"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition-colors"
            >
              Choose a file
            </label>
          </div>
        </div>
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={handleUpload}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <IoChevronUpCircleSharp className="mr-2" />
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadModal;