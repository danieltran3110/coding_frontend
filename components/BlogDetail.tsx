import React from 'react';
import { Flex } from '@chakra-ui/layout';
import { Image, Box, Text } from "@chakra-ui/react";

export default function BlogDetail({ handleShowBlog, blog }) {
    return (
        <Flex onClick={() => handleShowBlog(blog)} key={blog.id} marginBottom="10" cursor="pointer" alignItems="center" justifyContent="flex-start">
            <Box minWidth="100px" width="100px" height="100px">
                <Image width="100%" height="100%" objectFit="cover" src={blog.image} alt="Segun Adebayo" />
            </Box>
            <Text marginLeft="2.5" fontSize="2xl">{blog.title}</Text>
        </Flex>
    )
}
