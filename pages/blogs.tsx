import React, { useEffect, useState } from 'react'
import {collection, onSnapshot} from 'firebase/firestore'
import { fire } from 'firebase';
import Head from "next/head";
import { Container, Flex } from '@chakra-ui/layout';
import { Text, Spinner } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/hooks';
import ModalComponent from 'components/ModalComponent';
import BlogDetail from '../components/BlogDetail';


export default function blog() {
    const [allBlogs, setAllBlogs] = useState([]);
    const [blogDetail, setBlogDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onSnapshot(collection(fire, "blogs"), (querySnapshot) => {
            const newBlogs = [];
            querySnapshot.forEach((doc) => {
                newBlogs.push(doc.data());
            });
            setAllBlogs([...newBlogs]);
            setIsLoading(false);
        });

        return unsubscribe;
    }, [])

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleShowBlog = (blog) => {
        setBlogDetail(blog);
        onOpen();
    }

    return (
        <div>
             <Head>
                <title>Blogs Tests</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {
                    !isLoading ? 
                    <Container paddingTop="20" >
                        <Text fontSize="2xl" fontWeight="600" marginBottom="5">Blogs</Text>
                        <Flex flexDirection="column">
                            {
                                allBlogs && allBlogs.map((data) => 
                                    <BlogDetail key={data.id} handleShowBlog={handleShowBlog} blog={data} />
                                )
                            }
                        </Flex>

                    <ModalComponent isOpen={isOpen} onClose={onClose} blog={blogDetail} />
                    </Container> : 
                    <Flex height="500" justifyContent="center" alignItems="center">
                        <Spinner size="xl" />
                    </Flex>
                }
            </main>
        </div>
    )
}
