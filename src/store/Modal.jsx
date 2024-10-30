import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, onConfirm, title, message, initialTitle }) => {
  const [titleInput, setTitleInput] = useState(initialTitle || '');

  useEffect(() => {
    setTitleInput(initialTitle || '');
  }, [initialTitle, isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(titleInput);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">{title}</h2>
        <p className="text-gray-700 mb-3">{message}</p>
        <input
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Yangi nomni kiriting..."
        />
        <div className="mt-5 flex justify-end">
          <button 
            onClick={onClose} 
            className="mr-2 border border-gray-300 p-2 rounded-md hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button 
            onClick={handleConfirm} 
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400 transition duration-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
