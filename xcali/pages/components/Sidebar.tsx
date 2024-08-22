// components/Sidebar.tsx
import Image from 'next/image';

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50">
      <div className="p-4 border-b">
        <button onClick={onClose} className="text-gray-700 text-xl float-right">✕</button>
        <div className="flex items-center space-x-4 mt-2">
          <Image
            src="/next.svg"
            alt="User Avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">User Name</h2>
            <p className="text-gray-600">user@example.com</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Profile Options</h3>
        <ul>
          <li className="py-2"><a href="#" className="text-blue-600 hover:underline">Profile Settings</a></li>
          <li className="py-2"><a href="#" className="text-blue-600 hover:underline">Logout</a></li>
        </ul>
      </div>
    </div>
  );
}
