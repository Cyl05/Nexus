import { Box, Button, Heading, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import UpvoteDownvote from '../Misc/UpvoteDownvote.jsx';
import { useUserStore } from '../../../store/user.js';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';

function Comment(props) {
    dayjs.extend(relativeTime);
    const { getUserData } = useUserStore();
    const navigate = useNavigate();

    const [user, setUser] = React.useState();

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
                <HStack w={'full'} justify={'space-between'}>
                    <Box>
                        <Heading size={'sm'} display={'inline'} mr={2}>{user.display_name}</Heading>
                        { props.op ? <Text color={'#00FFFF'} fontSize={'sm'} mr={2} display={'inline'}>OP</Text> : null }
                        <Text display={'inline'} fontSize={13} color={'gray'}>• {dayjs(props.comment.created_at).fromNow()}</Text>
                    </Box>
                    {
                        props.postLink && 
                        <Button 
                            variant={'outline'}
                            borderRadius={'full'}
                            colorScheme='teal'
                            onClick={() => navigate(`/post/${props.comment.post_id}`)}
                        >
                            Original Post
                        </Button>
                    }
                </HStack>
            </HStack>
            <Text my={3}>{props.comment.content}</Text>
            <UpvoteDownvote horizontalOrientation={true} post={props.comment} voteArea={'comment'} />
        </Box> 
    )
}

export default Comment;