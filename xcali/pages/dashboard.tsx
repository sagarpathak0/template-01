import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { GetServerSideProps } from "next";
import { useAuth } from "@/hooks/useAuth";

interface DashboardProps {
    isAuthenticated: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ }) => {
    const { isAuthenticated, user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!isAuthenticated) {
        return <p>Access denied. You must be logged in to view this page.</p>;
    }

    const handleSidebarClose = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            {/* <Sidebar onClose={handleSidebarClose} /> */}
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p>Welcome to the dashboard! Only logged-in users can see this.</p>
            </main>
        </div>
    );
}



export default Dashboard;
