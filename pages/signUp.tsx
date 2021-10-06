import React, {useEffect, useState} from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Text,
    Container,
    Input,
    Center,
    Button,
    Flex
  } from "@chakra-ui/react";
import { useAuth } from '../contexts/AuthContext';
import { useToast } from "@chakra-ui/react"
import { auth } from '../firebase';
import { validateEmail, warning } from 'utils/common';
import {useRouter} from "next/router";
import Head from "next/head";


export default function signUp() {
    const Toast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { signUpAccount } : any = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async() => {
        setLoading(true);
        if (verifyInputs()) {
            try {
                await signUpAccount(email, password);
                router.push('/login');
            } catch (error) {                
                warning(Toast, error.message);
            }
            setLoading(false);
            resetInputs();
        } else {
            setLoading(false);
        }
    }

    const resetInputs = () => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const verifyInputs = () => {
        console.log('email', email);
        console.log('password', password);
        console.log('confirmPassword', confirmPassword);

        if (!email || !password || !confirmPassword) {
            warning(Toast, "All the input is required");
            return false;
        }

        if (!validateEmail(email)) {
            warning(Toast, "Please type the right email !!!")
            return false;
        }

        if (password !== confirmPassword) {
            warning(Toast, "Password and confirm password must be the same !!!");
            return false;
        }

        return true;
    }


    return (
        <>
        <Head>
            <title>Sign Up Page</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
             <Center display="flex" flexDirection="column" h={'500px'}>
                <Text fontSize="2xl">Sign Up</Text>
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input onChange={(e) => setEmail(e.currentTarget.value)} type="email" />
                    <FormLabel>Password</FormLabel>
                    <Input onChange={(e) => setPassword(e.currentTarget.value)} type="password" />
                    <FormLabel>Confirm Password</FormLabel>
                    <Input onChange={(e) => setConfirmPassword(e.currentTarget.value)} type="password" />
                    <Flex justifyContent="flex-end" marginTop="5">
                        <Button isLoading={loading} onClick={handleSignUp} colorScheme="blue">Sign Up</Button>
                    </Flex>
                </FormControl>
             </Center>
        </Container>
        </>
    )
}
