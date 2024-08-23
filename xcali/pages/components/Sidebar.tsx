import { useAuth } from "@/hooks/useAuth";


interface SidebarProps {
    onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
    const {user,logout,isAuthenticated} = useAuth();
    // if (!auth) {
    //     return null;
    // }

   

    return (
        <div className="fixed top-0 right-0 w-64 h-full bg-gray-800 text-white shadow-lg p-4">
            <button onClick={onClose} className="text-xl">&times;</button>
            <div className="mt-6">
                {user ? (
                    <>
                        <p className="text-lg font-semibold">Welcome, {user.name}</p>
                        <ul className="mt-4">
                            <li><a href="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</a></li>
                            <li><button onClick={logout} className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded">Logout</button></li>
                        </ul>
                    </>
                ) : (
                    <ul>
                        <li><a href="/auth/login" className="block py-2 px-4 hover:bg-gray-700 rounded">Login</a></li>
                        <li><a href="/auth/register" className="block py-2 px-4 hover:bg-gray-700 rounded">Register</a></li>
                    </ul>
                )}
            </div>
        </div>
    );
}
