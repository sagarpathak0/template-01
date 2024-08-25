import { useAuth } from "@/hooks/useAuth";
import {googleAuthProvider,auth,githubAuthProvider} from "@/config/firebase"
import {signInWithPopup}from "firebase/auth"
import Link from "next/link";

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { user, logout, isAuthenticated } = useAuth();
  
 
  const handleGoogle = async()=>{
    try{
      const result = await signInWithPopup(auth,googleAuthProvider)
      const idToken = result.user.getIdToken()
      console.log(idToken)
    }
    catch(err){
      console.log("Google Auth Register Error",err);
    }
  }
  const handleGithub = async()=>{
    try{
      const result = await signInWithPopup(auth,githubAuthProvider)
      const idToken = result.user.getIdToken()
      console.log(idToken)
    }
    catch(err){
      console.log("Github Auth Register Error",err);
    }
  }

  return (
    <div className="fixed top-0 right-0 w-64 h-full bg-gray-800 text-white shadow-lg p-4">
      <button onClick={onClose} className="text-xl">
        &times;
      </button>
      <div className="mt-6">
        {user ? (
          <>
            <p className="text-lg font-semibold">Welcome, {user.name}</p>
            <ul className="mt-4">
              <li>
                <Link
                  href="/dashboard"
                  className="block py-2 px-4 hover:bg-gray-700 rounded"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="block py-2 px-4 hover:bg-gray-700 rounded"
                >
                  Chats
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block w-full text-left py-2 px-4 hover:bg-gray-700 rounded"
                >
                  Logout
                </button>
              </li>
              
            </ul>
          </>
        ) : (
          <ul>
            <li>
              <Link
                href="/auth/login"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/auth/signUp"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
