import { Box, Divider, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import React from 'react';
import { useUserStore } from '../../../store/user.js';

function Post(props) {
    const { getUserData } = useUserStore();
    const [user, setUser] = React.useState();
    React.useEffect(() => {
        async function getUser() {
            const userData =  await getUserData(props.post.author_id);
            setUser(userData);
        }
        getUser();
    }, [])
    

    return (
        <Box w={'95%'} bgColor={'#2D384D'} borderRadius={10} p={5}>
            <HStack align={'flex-start'}>
                <Box w={'7%'} align={'center'} mr={5} mt={2}>
                    <IconButton icon={<TriangleUpIcon />} borderTopRadius={'full'} minW={'full'} />
                    <Box bgColor={'#3D485B'} w={'full'} p={2}>25</Box>
                    <IconButton icon={<TriangleDownIcon />} borderBottomRadius={'full'} minW={'full'} />
                </Box>
                <Box>
                    <Text color={'gray'}>Posted by <Heading size={'xs'} display={'inline'} color={'white'}>{user && user.username}</Heading></Text>
                    <Heading mb={4}>{props.post.post_title}</Heading>
                    <Text fontSize={20} ml={1} mb={3}>{props.post.post_content}</Text>
                    <Image src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s'} />
                </Box>
            </HStack>
        </Box>
    )
}

export default Post;