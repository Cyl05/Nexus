import { Box, Heading, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useUserStore } from '../../../store/user.js';

function PostViewPost(props) {
    const { getUserData } = useUserStore();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        async function getUser () {
            if (props.post) {
                const userData =  await getUserData(props.post.author_id);
                setUser(userData);
            }
        }
        getUser();
    }, []);

    return (
        props.community && props.post ?
        <Box w={'95%'} bgColor={'#2D384D'} borderRadius={10} p={5}>
            <HStack align={'center'} mb={5}>
                <IconButton icon={<ArrowBackIcon />} borderRadius={'full'} />
                <HStack align={'center'} as={'a'} href={`/community/${props.community.id}`}>
                    <Image src={props.community.icon} w={10} h={10} borderRadius={'full'} border={'2px solid white'} />
                    <VStack align={'flex-start'} spacing={0}>
                        <Heading size={'sm'}> {props.community.name}</Heading>
                        <Text display={'block'}>{user && user.username}</Text>
                    </VStack>
                </HStack>
            </HStack>
            <VStack align={'flex-start'} spacing={4}>
                <Heading>{props.post.post_title}</Heading>
                <Text>
                    {props.post.post_content}
                </Text>
                <Box w={'full'} bgColor={'black'} align={'center'} borderRadius={7}>
                    <Image src={props.post.image} />
                </Box>
            </VStack>
        </Box>
        : <div>Loading...</div>
    )
}

export default PostViewPost;