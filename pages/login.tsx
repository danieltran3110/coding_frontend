import React from 'react'
import {
    FormControl,
    FormLabel,
    Container,
    Input,
    Center,
    Button,
    Text,
    Flex
  } from "@chakra-ui/react"
  
  import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { validateEmail, warning } from 'utils/common';
import { useToast } from "@chakra-ui/react"
import  Link from 'next/link';
import Head from "next/head";
import {useRouter} from "next/router";

export default function login() {
    const Toast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginAccount } : any = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleLogin = async() => {
        setLoading(true);
        if (verifyInputs()) {
            try {
                await loginAccount(email, password);
                router.push('/');
            } catch (error) {
                if (error.code == 'auth/wrong-password') {
                    warning(Toast, 'Failed to login account');
                } if (error.code == 'auth/too-many-requests') {
                    warning(Toast, 'Too many request');    
                } else {
                    warning(Toast, 'Failed to login account');
                }
            }
            setLoading(false);
        } else {
            setLoading(false);
        }
    }

    const verifyInputs = () => {
        if (!email || !password) {
            warning(Toast, "All the input is required");
            return false;
        }

        if (!validateEmail(email)) {
            warning(Toast, "Please type the right email !!!")
            return false;
        }

        return true;
    }

    return (
        <>
        <Head>
            <title>Login Page</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
             <Center display="flex" flexDirection="column" h={'500px'}>
                <Text fontSize="2xl">Login</Text>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input value={email} onChange={(e) => setEmail(e.currentTarget.value)} id="email" type="email" />
                    <FormLabel>Password</FormLabel>
                    <Input value={password} onChange={(e) => setPassword(e.currentTarget.value)} id="password" type="password" />
                    <Flex justifyContent="space-between" alignItems="center"  marginTop="5">
                        <Link href="/signUp">Create new account?</Link>
                        <Button isLoading={loading} onClick={handleLogin} colorScheme="blue">Login</Button>
                    </Flex>
                </FormControl>
             </Center>
        </Container>
        </>
    )
}
