import React from 'react';

const ChatWindow: React.FC = () => {
  return (
    <div className="flex-1 bg-white p-4 border-l border-gray-200 flex flex-col ">
      <div className="border-b border-gray-200 pb-2 mb-4">
        <h2 className="text-lg font-semibold">Chat Name</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 bg-gray-100 border border-gray-200 rounded mb-2">Hello!</div>
        <div className="p-2 bg-gray-100 border border-gray-200 rounded mb-2">Hi there!</div>
        {/* Add more messages here */}
      </div>
      <div className="flex items-center border-t border-gray-200 pt-2 mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
