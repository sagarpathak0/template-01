import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            
            setUser({ name: "John Doe", email: "john@example.com" });
        }
    }, []);

    const login = async (email, password) => {
        
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            email,
            password,
        });
        localStorage.setItem('token', response.data.token);
        setUser({ name: "John Doe", email }); 
        router.push('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
