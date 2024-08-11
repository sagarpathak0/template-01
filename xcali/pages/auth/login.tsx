import React from "react";
import {useState, FormEvent} from "react";
import axios from 'axios';
import {useRouter} from 'next/router';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try{

            if(!email){
                setError("Please enter a valid email address");
                return;
            }
            if(!password){
                setError("Please enter the password");
                return;
            }
            
            const response = await axios.post('http://localhost:8080/api/auth/login',{
                email: email,
                password: password,
            });
                
            localStorage.setItem('token', response.data.token);

            router.push('/');
        }catch(err){
            setError("Invalid credentials or server error");    
        }
    }
    return(
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input className="text-black mt-1 block w-full px-3 py-2 vorder boder-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                    <input className="text-black mt-1 block w-full px-3 py-2 vorder boder-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                {error && <p>{error}</p>}
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login;