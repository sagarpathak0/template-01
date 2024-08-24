import React from "react";
import { useAuth } from "@/hooks/useAuth";
import FileUpload from "@/components/FileUpload";

const Dashboard: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl text-gray-600">Access denied. You must be logged in to view this page.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 p-6 bg-indigo-600 text-white fixed h-full">
                <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <a href="/overview" className="text-lg hover:text-indigo-300">Overview</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-lg hover:text-indigo-300">Settings</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-lg hover:text-indigo-300">Support</a>
                    </li>
                    {/* <li className="mt-10">
                        <button onClick={logout} className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md text-white">
                            Logout
                        </button>
                    </li> */}
                </ul>
            </div>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <div className="flex items-center">
                        <p className="text-gray-700 mr-4">Hello, {user?.name}</p>
                        <img src={user?.avatar || "/default-avatar.png"} alt="User Avatar" className="w-10 h-10 rounded-full"/>
                    </div>
                </div>
                <p className="text-lg text-gray-600 mb-8">Welcome to your dashboard! Only logged-in users can see this.</p>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Create project</h2>
                    <FileUpload />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
