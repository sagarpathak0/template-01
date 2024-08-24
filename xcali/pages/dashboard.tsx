import React,{useState} from "react";
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     // const token = context.req.cookies.token || '';
//     const token = localStorage.getItem("token")
//     try {
//         const res = await fetch('http://localhost:8080/api/auth/verify', {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//             },
//         });
//         console.log(res)

//         if (res.ok) {
//             return { props: { isAuthenticated: true } };
//         } else {
//             return { props: { isAuthenticated: false } };
//         }
//     } catch {
//         return { props: { isAuthenticated: false } };
//     }
// }

export default Dashboard;
