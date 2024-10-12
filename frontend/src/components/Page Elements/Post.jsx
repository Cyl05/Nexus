import { Box, Button, Heading, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useUserStore } from '../../../store/user.js';
import { FaCommentAlt } from "react-icons/fa";
import { usePostStore } from '../../../store/post.js';
import UpvoteDownvote from '../Misc/UpvoteDownvote.jsx';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCommunityStore } from '../../../store/community.js';

function Post(props) {
    dayjs.extend(relativeTime);
    const { getUserData } = useUserStore();
    const { fetchCommentNumber } = usePostStore();
    const { fetchCommunity } = useCommunityStore();

    const [user, setUser] = React.useState();
    const [comments, setComments] = React.useState();
    const [community, setCommunity] = React.useState();

    React.useEffect(() => {
        async function getUser() {
            const userData = await getUserData(props.post.author_id);
            setUser(userData);
        }

        async function numberOfComments() {
            const response = await fetchCommentNumber(props.post.id);
            setComments(response);
        }

        async function getCommunity(communityId) {
            const response = await fetchCommunity(communityId);
            setCommunity(response);
        }

        if (user && !props.community) {
            getCommunity(props.communityId);
        }

        numberOfComments();
        getUser();
    }, []);

    return (
        props.post &&
        <Box w={props.w ? props.w : '95%'} bgColor={'#2D384D'} borderRadius={10} p={5}>
            <HStack align={'flex-start'}>
                <Box w={'7%'} align={'center'} mr={5} mt={2}>
                    <UpvoteDownvote post={props.post} voteArea={'post'} />
                    <Button
                        mt={3}
                        h={'10vh'}
                        borderTopRadius={'full'}
                        borderBottomRadius={'full'}
                        maxW={'full'}
                        as={'a'}
                        href={`/post/${props.post.id}`}
                    >
                        <VStack>
                            <FaCommentAlt />
                            <Text>{comments}</Text>
                        </VStack>
                    </Button>
                </Box>
                <Box>
                    {
                        community &&
                        <HStack>
                            <Image src={community && community.icon} w={10} h={10} borderRadius={'full'} border={'2px solid white'} objectFit={'cover'} />
                            <Heading size={'sm'}> {community && community.name}</Heading>
                        </HStack>
                    }
                        {props.communityId
                            ? null
                            : <HStack>
                                <Text color={'gray'}>
                                    Posted by 
                                    <Heading size={'xs'} display={'inline'} color={'white'}>
                                        {user && user.display_name}
                                    </Heading>
                                </Text>
                                <Text display={'inline'} fontSize={13} color={'gray'}>• {dayjs(props.post.posted_at).fromNow()}</Text>
                            </HStack>
                        }
                    <Heading mb={4}>{props.post.post_title}</Heading>
                    <Text fontSize={20} ml={1} mb={3}>{props.post.post_content}</Text>
                    {props.post.image && <Image src={props.post.image} />}
                </Box>
            </HStack>
        </Box>
    )
}

export default Post;