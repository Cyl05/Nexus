import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import UpvoteDownvote from '../Misc/UpvoteDownvote.jsx';
import { useUserStore } from '../../../store/user.js';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

function Comment(props) {
    dayjs.extend(relativeTime);
    const { getUserData } = useUserStore();

    const [user, setUser] = React.useState();
    console.log(props.op);

    React.useEffect(() => {
        async function getUser() {
            const response = await getUserData(props.comment.user_id);
            setUser(response);
        }
        
        if (props.comment) {
            getUser();
        }
    }, [props.comment]);

    return (
        user &&
        <Box bgColor={'#2D384D'} borderRadius={10} p={5} my={5}>
            <HStack spacing={3}>
                <Image src={user.profile_picture} w={8} borderRadius={'full'} />
                <HStack>
                    <Heading size={'sm'}>{user.username}</Heading>
                    { props.op ? <Text color={'#00FFFF'} fontSize={'sm'}>OP</Text> : null }
                    <Text display={'inline'} fontSize={13} color={'gray'}>• {dayjs(props.comment.created_at).fromNow()}</Text>
                </HStack>
            </HStack>
            <Text my={3}>{props.comment.content}</Text>
            <UpvoteDownvote horizontalOrientation={true} post={props.comment} voteArea={'comment'} />
        </Box> 
    )
}

export default Comment;