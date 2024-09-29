import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import UpvoteDownvote from '../Misc/UpvoteDownvote.jsx';
import { useUserStore } from '../../../store/user.js';
import { useCommentStore } from '../../../store/comment.js';

function Comment(props) {
    const { getUserData } = useUserStore();
    const { fetchCommentCount } = useCommentStore();

    const [user, setUser] = React.useState();

    React.useEffect(() => {
        async function getUser() {
            const response = await getUserData(props.comment.user_id);
            setUser(response);
        }

        async function getCommentVoteCount() {
            const response = await fetchCommentCount(props.comment.id);
        }
        if (props.comment) {
            getCommentVoteCount();
            getUser();
        }
    }, [props.comment]);

    return (
        user &&
        <Box bgColor={'#2D384D'} borderRadius={10} p={5} my={5}>
            <HStack spacing={3}>
                <Image src={user.profile_picture} w={8} borderRadius={'full'} />
                <Heading size={'sm'}>{user.username}</Heading>
            </HStack>
            <Text my={3}>{props.comment.content}</Text>
            <UpvoteDownvote horizontalOrientation={true} post={props.comment} voteArea={'comment'} />
        </Box> 
    )
}

export default Comment;