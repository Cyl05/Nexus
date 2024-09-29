import React from 'react';
import SideBar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
import Navbar from "../components/Page Elements/Navbar.jsx";
import { Box, Divider, Heading, HStack, IconButton, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useCommunityStore } from '../../store/community.js';
import { usePostStore } from '../../store/post.js';
import { useCommentStore } from '../../store/comment.js';
import { useUserStore } from '../../store/user.js';
import CommunityDesc from '../components/Community Page/CommunityDesc.jsx';
import PostViewPost from '../components/Post Page/PostViewPost.jsx';
import { IoSend } from "react-icons/io5";
import Comment from '../components/Post Page/Comment.jsx';

function PostViewPage() {
    const { fetchCommunity } = useCommunityStore();
    const { fetchPost, fetchPostComments } = usePostStore();
    const { createComment } = useCommentStore();
    const { currentUser, refreshAccessToken } = useUserStore();
    const { postId } = useParams("");

    const [post, setPost] = React.useState();
    const [community, setCommunity] = React.useState();
    const [commentData, setCommentData] = React.useState({userId: currentUser.userId, content: ""});
    const [comments, setComments] = React.useState([]);
    const toast = useToast();

    function handleChange(event) {
        const { value } = event.target;
        setCommentData(prevValue => ({...prevValue, content: value}));
    }

    async function handleSubmit() {
        const accessToken = await refreshAccessToken();
        const response = await createComment(postId, commentData, accessToken);
        toast({
            title: response.message,
            status: response.isSuccess ? 'success' : 'error',
            duration: 2000,
            isClosable: true
        });
        if (response.isSuccess) {
            setCommentData(prevState => ({...prevState, content: ""}));
        }
    }

    React.useEffect(() => {
        async function getCommunity() {
            const response = await fetchPost(postId);
            setPost(response);
            const community = await fetchCommunity(response.community_id);
            setCommunity(community);
            const commentsResponse = await fetchPostComments(postId);
            setComments(commentsResponse.data);
        }
        getCommunity();
    }, []);

    return (
        <Box>
            <Navbar />
            <SideBar />
            <MainContent>
                <HStack spacing={0} align={'flex-start'}>
                    <Box w={'95%'}>
                        <PostViewPost community={community} post={post} />
                        <Heading size={'lg'} my={5}>Comments:</Heading>
                        <Divider bgColor={'#343E5B'} />
                        <InputGroup mt={5}>
                            <Input
                                placeholder='Add a comment'
                                size='md'
                                borderRadius={'full'}
                                colorScheme='teal'
                                p={6}
                                pr={'7%'}
                                onChange={handleChange}
                                value={commentData.content}
                                style={{
                                    minHeight: '50px',
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    resize: 'vertical'
                                }}
                            />
                            <InputRightElement mt={1} mr={1}>
                                <IconButton icon={<IoSend />} borderRadius={'full'} colorScheme='teal' onClick={handleSubmit} />
                            </InputRightElement>
                        </InputGroup>
                        {comments.map(comment => (
                            <Comment comment={comment} />
                        ))}
                    </Box>
                    <CommunityDesc 
                        community={community} postView={true}
                    />
                </HStack>
            </MainContent>
        </Box>
    )
}

export default PostViewPage;