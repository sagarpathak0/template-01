import { useAuth } from "@/hooks/useAuth";
import { googleAuthProvider, auth, githubAuthProvider } from "@/config/firebase";
import { signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface SidebarProps {
  onClose: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const { user, logout } = useAuth();

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await result.user.getIdToken();
      console.log(idToken);
    } catch (err) {
      console.log("Google Auth Register Error", err);
    }
  };

  const handleGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubAuthProvider);
      const idToken = await result.user.getIdToken();
      console.log(idToken);
    } catch (err) {
      console.log("Github Auth Register Error", err);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-gradient-to-br from-blue-800 via-indigo-700 to-purple-800 text-white shadow-lg p-6 flex flex-col">
      {/* Updated Close Button */}
      <div
        role="button"
        aria-label="check"
        onClick={onClose} 
        className="self-end p-2 mb-6 bg-transparent rounded-full hover:bg-white hover:text-gray-800 transition-colors"
      >
        <FaTimes className="text-2xl" />
      </div>

      {/* User Profile Section */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden mr-4 bg-white">
          <img
            src={user?.profilePic || "/default-profile.png"}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-lg font-semibold">{user ? `Welcome, ${user.name}` : "Welcome"}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto">
        {user ? (
          <>
            <ul className="space-y-4">
              <li>
                <Link href="/dashboard">
                  <div className="block py-2 px-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
                    Dashboard
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/chat">
                  <div className="block py-2 px-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
                    Chats
                  </div>
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block w-full text-left py-2 px-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </li>
            </ul>
          </>
        ) : (
          <ul className="space-y-4">
            <li>
              <Link href="/auth/login">
                <div className="block py-2 px-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
                  Login
                </div>
              </Link>
            </li>
            <li>
              <Link href="/auth/signUp">
                <div className="block py-2 px-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
                  Register
                </div>
              </Link>
            </li>
            <li>
              <button
                onClick={handleGoogle}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Sign in with Google
              </button>
            </li>
            <li>
              <button
                onClick={handleGithub}
                className="block w-full text-left py-2 px-4 rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
              >
                Sign in with GitHub
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
