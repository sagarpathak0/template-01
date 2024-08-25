import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'personal' | 'group'>('personal');

  const handleTabSwitch = (tab: 'personal' | 'group') => {
    setActiveTab(tab);
  };

  return (
    <div className="w-80 bg-gray-50 p-6 border-r border-gray-200 h-screen flex flex-col">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition text-black"
        />
      </div>

      {/* Buttons to Switch Between Tabs */}
      <div className="flex mb-6 space-x-4">
        <button
          className={`flex-1 py-2 rounded-lg text-center font-semibold ${activeTab === 'personal' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => handleTabSwitch('personal')}
        >
          Personal Chats
        </button>
        <button
          className={`flex-1 py-2 rounded-lg text-center font-semibold ${activeTab === 'group' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => handleTabSwitch('group')}
        >
          Group Chats
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {activeTab === 'personal' ? (
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition text-black">
            Personal Chat 1
          </div>
        ) : (
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition text-black">
            Group Chat 1
          </div>
        )}
        {/* Add more messages here */}
      </div>
    </div>
  );
};

export default Sidebar;
