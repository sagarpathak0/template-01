import React, { useState, FormEvent } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { signInWithPopup } from "firebase/auth";
import { auth, githubAuthProvider, googleAuthProvider } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const { githubLogin, googleLogin,login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

        try {
            if (!email) {
                setError("Please enter a valid email address");
                return;
            }
            if (!password) {
                setError("Please enter the password");
                return;
            }
            await login({email,password})
           
        } catch (err) {
            setError("Invalid credentials or server error");
        }
    };

    const handleGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            const idToken = await result.user.getIdToken();
            await googleLogin(idToken);
        } catch (err) {
            console.log("Google login error:", err);
        }
    };

    const handleGithub = async () => {
        try {
            const result = await signInWithPopup(auth, githubAuthProvider);
            const idToken = await result.user.getIdToken();
            await githubLogin(idToken);
        } catch (err) {
            console.log("GitHub login error:", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between gap-4 mb-4">
                        <button
                            type="button"
                            onClick={handleGoogle}
                            className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <FaGoogle className="mr-2 text-lg" />
                            Google
                        </button>
                        <button
                            type="button"
                            onClick={handleGithub}
                            className="w-full flex items-center justify-center bg-gray-800 text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-gray-500 focus:ring-offset-2"
                        >
                            <FaGithub className="mr-2 text-lg" />
                            GitHub
                        </button>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 mb-4"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
