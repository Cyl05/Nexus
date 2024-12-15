import { Box, Button, Heading, HStack, IconButton, Image, Text, textDecoration, VStack } from '@chakra-ui/react';
import React from 'react';
import { useUserStore } from '../../../store/user.js';
import { FaBookmark, FaCommentAlt, FaRegBookmark } from "react-icons/fa";
import { usePostStore } from '../../../store/post.js';
import UpvoteDownvote from '../Misc/UpvoteDownvote.jsx';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCommunityStore } from '../../../store/community.js';
import PostHeader from '../Misc/PostHeader.jsx';

function Post(props) {
    dayjs.extend(relativeTime);
    const { currentUser, getUserData, savePost, refreshAccessToken } = useUserStore();
    const { fetchCommentNumber, savePostStatus } = usePostStore();
    const { fetchCommunity } = useCommunityStore();

    const [user, setUser] = React.useState();
    const [comments, setComments] = React.useState();
    const [community, setCommunity] = React.useState();
    const [saved, setSaved] = React.useState(false);

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

        getCommunity(props.communityId)
        numberOfComments();
        getUser();
    }, []);

    async function getSaveState() {
        if (currentUser) {
            const response = await savePostStatus(props.post.id, currentUser.userId);
            setSaved(response);
        }
    }

    async function handleSave() {
        if (currentUser) {
            const accessToken = await refreshAccessToken();
            const response = await savePost(props.post.id, currentUser.userId, accessToken);
            setSaved(response);
        }
    }

    if (user) {
        getSaveState();
    }

    return (
        props.post &&
        <Box w={props.w ? props.w : '95%'} bgColor={'#2D384D'} borderRadius={10} p={5}>
            <HStack align={'flex-start'} justify={'space-between'}>
                <HStack spacing={5}>
                    <Box w={'14%'} mr={5} mt={2}>
                        <UpvoteDownvote post={props.post} voteArea={'post'} communityId={props.communityId} />
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
                    <Box w={'full'}>
                        {community && <PostHeader community={community} post={props.post} communityView={props.communityView} user={user && user} />}
                        <Heading mb={4}>{props.post.post_title}</Heading>
                        <Text fontSize={20} ml={1} mb={3}>{props.post.post_content}</Text>
                        {props.post.image && <Image src={props.post.image} />}
                    </Box>
                </HStack>
                <IconButton
                    icon={saved ? <FaBookmark /> : <FaRegBookmark />}
                    variant={'ghost'}
                    borderRadius={'full'}
                    onClick={handleSave}
                />
            </HStack>
        </Box>
    )
}

export default Post;