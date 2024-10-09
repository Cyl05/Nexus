import { Box, Heading, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useUserStore } from '../../../store/user.js';
import UpvoteDownvote from '../Misc/UpvoteDownvote.jsx';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';

function PostViewPost(props) {
    dayjs.extend(relativeTime);
    const navigate = useNavigate();
    const { getUserData } = useUserStore();

    React.useEffect(() => {
        async function getUser () {
            if (props.post) {
                const userData =  await getUserData(props.post.author_id);
                props.setUser(userData);
            }
        }
        getUser();
    }, [props.post]);

    return (
        props.community && props.post ?
        <Box bgColor={'#2D384D'} borderRadius={10} p={5}>
            <HStack align={'center'} mb={5}>
                <IconButton icon={<ArrowBackIcon />} borderRadius={'full'} onClick={() => navigate(-1)} />
                <HStack align={'center'} as={'a'} href={`/community/${props.community.id}`}>
                    <Image src={props.community.icon} w={10} h={10} borderRadius={'full'} border={'2px solid white'} objectFit={'cover'} />
                    <VStack align={'flex-start'} spacing={0}>
                        <Heading size={'sm'}> {props.community.name}</Heading>
                        <HStack>
                            <Text>{props.user && props.user.username}</Text>
                            <Text display={'inline'} fontSize={13} color={'gray'}>• {dayjs(props.post.posted_at).fromNow()}</Text>
                        </HStack>
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
                <UpvoteDownvote post={props.post} horizontalOrientation={true} voteArea={'post'} />
            </VStack>
        </Box>
        : <div>Loading...</div>
    )
}

export default PostViewPost;