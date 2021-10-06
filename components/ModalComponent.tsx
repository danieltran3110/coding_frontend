import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
import { Flex } from '@chakra-ui/layout';
import { Image, Box, Text, Button } from "@chakra-ui/react"

export default function ModalComponent({ onClose, isOpen, blog}) {
    return (
        <Modal size="xl" blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader marginTop="5">{blog && blog.title ? blog.title : 'title'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex flexDirection="column" alignItems="center">
                    <Box height="100px">
                        <Image width="100%" height="100%" objectFit="cover" src={blog && blog.image ? blog.image : 'https://znews-photo.zadn.vn/w480/Uploaded/gtnvzv/2021_10_05/HP_Nguyen_Duong.jpg'} alt="Segun Adebayo" />
                    </Box>
                    <Text marginTop="10" fontWeight="bold" mb="1rem">
                        {blog && blog.description ? blog.description : 'Empty'}
                    </Text>
                </Flex>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    )
}
