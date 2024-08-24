import React, { useState, FormEvent } from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { signInWithPopup } from "firebase/auth";
import { auth, githubAuthProvider, googleAuthProvider } from "@/config/firebase";
import { useAuth } from "@/hooks/useAuth";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const {githubLogin,googleLogin} = useAuth();


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
            
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: email,
                password: password,
            });
                
            localStorage.setItem('token', response.data.token);

            router.push('/dashboard');
        } catch (err) {
            setError("Invalid credentials or server error");    
        }
    }

    const handleGoogle = async () => {
        try {
          const result = await signInWithPopup(auth, googleAuthProvider);
          const idToken = await result.user.getIdToken();
        //   console.log("Google id Token", idToken);
          await googleLogin(idToken)
        } catch (err) {
          console.log("handle Google Error at SignUp ", err);
        }
      };
    
      const handleGithub = async () => {
        try {
          const result = await signInWithPopup(auth, githubAuthProvider);
          const idToken = await result.user.getIdToken();
          console.log("Github id Token", idToken);
          await githubLogin(idToken);
        } catch (err) {
          console.log("handle Github Error at SignUp ", err);
        }
      };
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white-700">Email</label>
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
                    <label htmlFor="password" className="block text-sm font-medium text-white-700">Password</label>
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
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Login
                </button>
                <div>
                    <button className="w-[48%] mr-4 mt-3 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleGoogle}
                    >
                        Google
                    </button>
                    <button className="w-[48%] mt-3 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleGithub}
                    >
                        Github
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
