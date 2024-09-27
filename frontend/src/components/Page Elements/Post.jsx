import { Box, Button, Heading, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import React from 'react';
import { useUserStore } from '../../../store/user.js';
import { FaCommentAlt } from "react-icons/fa";
import { usePostStore } from '../../../store/post.js';
import { useNavigate } from 'react-router-dom';

function Post(props) {
    const { getUserData } = useUserStore();
    const { currentUser, refreshAccessToken } = useUserStore();
    const { fetchVoteCount, votePost, fetchVoteState, fetchCommentNumber } = usePostStore();

    const [user, setUser] = React.useState();
    const [votes, setVotes] = React.useState();
    const [voteState, setVoteState] = React.useState();
    const [comments, setComments] = React.useState();

    async function handleVote(voteType, postId) {
        const accessToken = await refreshAccessToken();
        if (currentUser && accessToken) {
            await votePost(currentUser.userId, voteType, postId, accessToken);
            if (voteType === "upvote") {
                if (voteState) {
                    setVotes(prevState => prevState - 1);
                } else if (voteState === false) {
                    setVotes(prevState => prevState + 2);
                } else {
                    setVotes(prevState => prevState + 1);
                }
                setVoteState(prevState => (prevState ? null : true));
            } else {
                if (voteState === false) {
                    setVotes(prevState => prevState + 1);
                } else if (voteState === true) {
                    setVotes(prevState => prevState - 2);
                } else {
                    setVotes(prevState => prevState - 1);
                }
                setVoteState(prevState => (prevState === false ? null : false));
            }
        }
    }

    React.useEffect(() => {
        async function getUser() {
            const userData =  await getUserData(props.post.author_id);
            setUser(userData);
        }

        async function getVotes() {
            const voteCount = await fetchVoteCount(props.post.id);
            setVotes(parseInt(voteCount.upvote_count));
        }

        async function getVoteState() {
            const accessToken = await refreshAccessToken();
            const response = await fetchVoteState(currentUser.userId, "post", props.post.id, accessToken);
            setVoteState(response ? response.vote_type: null);
        }

        async function numberOfComments() {
            const response = await fetchCommentNumber(props.post.id);
            setComments(response);
        }
        
        numberOfComments();
        getVoteState();
        getUser();
        getVotes();
    }, []);

    return (
        props.post &&
        <Box w={'95%'} bgColor={'#2D384D'} borderRadius={10} p={5}>
            <HStack align={'flex-start'}>
                <Box w={'7%'} align={'center'} mr={5} mt={2}>
                    <IconButton
                        icon={<TriangleUpIcon color={voteState ? "red.500" : null} />}
                        borderTopRadius={'full'}
                        minW={'full'}
                        onClick={() => handleVote("upvote", props.post.id)}
                    />
                    <Box bgColor={'#3D485B'} w={'full'} p={2}><Text color={voteState ? "red.500" : (voteState === false ? "blue.500" : null)}>{votes}</Text></Box>
                    <IconButton
                        icon={<TriangleDownIcon color={voteState === false ? "blue.500" : null} />}
                        borderBottomRadius={'full'}
                        minW={'full'}
                        onClick={() => handleVote("downvote", props.post.id)}
                    />
                    <Button
                        mt={3}
                        h={'10vh'}
                        borderTopRadius={'full'}
                        borderBottomRadius={'full'}
                        w={'full'}
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
                    <Text color={'gray'}>Posted by <Heading size={'xs'} display={'inline'} color={'white'}>{user && user.username}</Heading></Text>
                    <Heading mb={4}>{props.post.post_title}</Heading>
                    <Text fontSize={20} ml={1} mb={3}>{props.post.post_content}</Text>
                    {props.post.image && <Image src={props.post.image} />}
                </Box>
            </HStack>
        </Box>
    )
}

export default Post;