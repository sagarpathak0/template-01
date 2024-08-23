import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export const withAuth = (getServerSidePropsFunc: GetServerSideProps) => {
    return async (context: GetServerSidePropsContext) => {
        const token = context.req.cookies.token || '';

        try {
            const res = await fetch('http://localhost:8080/api/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.ok) {
                return await getServerSidePropsFunc(context);
            } else {
                return { redirect: { destination: '/auth/login', permanent: false } };
            }
        } catch {
            return { redirect: { destination: '/auth/login', permanent: false } };
        }
    };
};
