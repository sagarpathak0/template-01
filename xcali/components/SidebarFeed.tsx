import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
    return (
        <div className="w-64 p-4 bg-gray-100 h-screen fixed">
            <div className="mb-6">
                <h2 className="text-xl font-bold">Navigation</h2>
            </div>
            <nav>
                <ul>
                    <li className="mb-4">
                        <Link href="/" className="text-lg font-medium text-gray-700 hover:text-gray-900">
                            Home
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link href="/profile" className="text-lg font-medium text-gray-700 hover:text-gray-900">
                            Profile
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link href="/notifications" className="text-lg font-medium text-gray-700 hover:text-gray-900">
                            Notifications
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link href="/settings" className="text-lg font-medium text-gray-700 hover:text-gray-900">
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
