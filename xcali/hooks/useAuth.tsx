import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            console.log("Token", token);

            if (!token) {
                setIsAuthenticated(false);
                setUser(null);
                router.push('/auth/login');
                return;
            }

            try {
                const res = await axios.get('http://localhost:8080/api/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add a space after Bearer
                    },
                });

                if (res.data && res.data.user) {
                    setUser(res.data.user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    router.push('/auth/login');
                }
            } catch (error:any) {
                console.error('Error during authentication check:', error.message);
                setIsAuthenticated(false);
                setUser(null);
                router.push('/auth/login'); // Uncommented to redirect to login on error
            }
        };

        checkAuth();
    }, [router]);

    const logout = async () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/auth/login');
    };

    return { isAuthenticated, user, logout };
};
