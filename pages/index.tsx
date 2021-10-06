import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { Button, Flex, Input, Text, Spinner } from "@chakra-ui/react"
import { useRef, useState } from "react";
import Link from 'next/link'
import { useAuth } from "contexts/AuthContext";
import { useRouter } from 'next/router';
import protectedRoute from '../hooks/route';

const Home = () => {
    const { user, logoutAccount, userAuthLoading } : any = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    console.log('user: ', user);

    const dynamicTextEl = useRef(null);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        dynamicTextEl.current.changeValue(e.target.value);
    };

    const handleSignOut = async() => {
        setLoading(true);
        await logoutAccount();
        router.push('/login');
        setLoading(false);
    }

    return (
        <div className={styles.container}>
        <Head>
            <title>Coding Tests</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            {
                !!user ?
                    <>
                        <Text marginBottom="5" fontSize="2xl">This is Test 1</Text>
                        <DynamicText ref={dynamicTextEl} />
                        <Input placeholder="Basic usage" onChange={onChange} />
                        <Text marginTop="20" fontSize="2xl">This is Test 2</Text>
                        <Flex width="xs" marginTop="5" justifyContent="space-between" alignItems="center">
                            <div className="custom-link"><Link href={"/blogs"}> Blogs Page</Link></div>
                            {
                            user && <Button isLoading={loading} onClick={handleSignOut} colorScheme="blue">Sign Out</Button>
                        }
                        </Flex>
                    </> :
                    <Flex height="500" justifyContent="center" alignItems="center">
                        <Spinner size="xl" />
                    </Flex>
            }
        </main>
        </div>
    );
};


export default protectedRoute(Home);
