import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'group'>('personal');

  const handleTabSwitch = (tab: 'personal' | 'group') => {
    setActiveTab(tab);
  };

  return (
    <div className="w-80 bg-gray-100 p-4 border-r border-gray-200 h-screen flex flex-col">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Buttons to Switch Between Tabs */}
      <div className="flex mb-4 space-x-2">
        <button
          className={`flex-1 p-2 rounded text-center ${activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabSwitch('personal')}
        >
          Personal Chats
        </button>
        <button
          className={`flex-1 p-2 rounded text-center ${activeTab === 'group' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => handleTabSwitch('group')}
        >
          Group Chats
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'personal' ? (
          <div className="p-2 bg-white border border-gray-200 rounded mb-2">Personal Chat 1</div>
        ) : (
          <div className="p-2 bg-white border border-gray-200 rounded mb-2">Group Chat 1</div>
        )}
        {/* Add more messages here */}
      </div>
    </div>
  );
};

export default Sidebar;
