import { useAuth } from 'contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from 'firebase';


export default function protectedRoute(Component) {
    return function ProtectedRoute (props) {
        const { user } : any = useAuth();
        const router = useRouter();

        useEffect(() => {
            const unsubscribe = auth.onAuthStateChanged(currentUser => {
                if (!currentUser) {
                    router.replace('/login');
                    return <h1>Loading</h1>;
                }
            })

            return unsubscribe;
        }, [])

        return <Component auth={auth} {...props} />
    }
}