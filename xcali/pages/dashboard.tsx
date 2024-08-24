import React from "react";
import { useAuth } from "@/hooks/useAuth";
import FileUpload from "../components/FileUpload";

const Dashboard: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();

    if (!isAuthenticated) {
        return <p>Access denied. You must be logged in to view this page.</p>;
    }

    return (
        <div className="flex">
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p>Welcome to the dashboard! Only logged-in users can see this.</p>
                <FileUpload />
            </main>
        </div>
    );
}



export default Dashboard;
