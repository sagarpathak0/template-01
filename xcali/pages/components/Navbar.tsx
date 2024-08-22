// components/Navbar.tsx
import { useState } from 'react';
import Image from 'next/image';
import Sidebar from './Sidebar';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="text-xl font-semibold">MyApp</div>
        <div className="relative">
          <button
            onClick={handleToggleSidebar}
            className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 focus:outline-none"
          >
            <Image
              src="/next.svg"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </button>
          {isSidebarOpen && (
            <Sidebar onClose={handleToggleSidebar} />
          )}
        </div>
      </nav>
    </>
  );
}
