import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth');
        if (!token && (router.pathname === '/dashboard' || router.pathname === '/upload' || router.pathname === '/chat' || router.pathname === '/meeting' || router.pathname === '/room/[roomId]')) {
            router.push('/auth/login');
        }
    }, [router]);

    return (
        <>
            <ThemeProvider defaultTheme='dark'>
                <Navbar /> 
                <main className="pt-20"> 
                    <Component {...pageProps} />
                </main>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
