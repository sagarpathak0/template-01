import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Navbar from './components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && router.pathname === '/dashboard') {
            router.push('/auth/login');
        }
    }, [router]);

    return (
        <>
            <Navbar /> 
            <main className="pt-16"> 
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
