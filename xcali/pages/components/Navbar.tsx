import { useState } from 'react';
import Image from 'next/image';
import Sidebar from './Sidebar';
import Link from 'next/link';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <nav
        className={`p-4 flex items-center justify-between shadow-lg fixed top-0 w-full z-50 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <Link href="/">MyApp</Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleDarkMode}
            className={`p-2 rounded-full focus:outline-none transition-transform transform hover:scale-110 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {darkMode ? (
              <span className="text-yellow-400">🌙</span> // Moon icon for dark mode
            ) : (
              <span className="text-yellow-500">☀️</span> // Sun icon for light mode
            )}
          </button>
          <button
            onClick={handleToggleSidebar}
            className={`p-2 rounded-full focus:outline-none transition-transform transform hover:scale-110 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <Image
              src="/next.svg"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </button>
          {isSidebarOpen && <Sidebar onClose={handleToggleSidebar} />}
        </div>
      </nav>
    </>
  );
}
