import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token') || '';
            try {
                const res = await fetch('http://localhost:8080/api/auth/verify', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                    router.push('/auth/login');
                }
            } catch {
                setIsAuthenticated(false);
                setUser(null);
                router.push('/auth/login');
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
