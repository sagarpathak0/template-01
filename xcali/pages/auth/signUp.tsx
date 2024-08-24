import React, { useState, FormEvent } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

const SignUp = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();


const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

        try {
            const response = await axios.post<{token: string}>('http://localhost:8080/api/auth/signup',{
                username,
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            router.push('/auth/login')
        } catch (err) {
            console.log('signup error:',err);
            setError("Invalid Format"); 
        }
    
    }
    return(
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-white-700">username</label>
                    <input className="text-black mt-1 block w-full px-3 py-2 vorder boder-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white-700">email</label>
                    <input className="text-black mt-1 block w-full px-3 py-2 vorder boder-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-white-700" htmlFor="password">password</label>
                    <input className="text-black mt-1 block w-full px-3 py-2 vorder boder-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                {error && <p>{error}</p>}
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2">
                    Sign Up
                </button>
                <div>
                    <button className="w-[48%] mr-4 mt-3 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2">
                        Google
                    </button>
                    <button className="w-[48%] mt-3 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2">
                        Github
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;