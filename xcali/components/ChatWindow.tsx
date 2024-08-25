import React from 'react';

const ChatWindow: React.FC = () => {
  return (
    <div className="flex-1 bg-white p-4 border-l border-gray-200 flex flex-col">
      <div className="border-b border-gray-200 pb-2 mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-black">Chat Name</h2>
        {/* Placeholder for future actions like settings */}
        <button className="text-black hover:text-gray-700 transition">⋮</button>
      </div>
      <div className="flex-1 overflow-y-auto mb-2">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md self-start text-black">
          Hello!
        </div>
        <div className="p-3 bg-green-50 border border-green-200 rounded-md self-end text-black">
          Hi there!
        </div>
        {/* Add more messages here */}
      </div>
      <div className="border-t border-gray-200 pt-2 mt-auto">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition text-black"
          />
          <button className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
