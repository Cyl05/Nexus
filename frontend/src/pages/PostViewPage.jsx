import React from 'react';
import SideBar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
import Navbar from "../components/Page Elements/Navbar.jsx";
import { Box, Divider, Heading, HStack, IconButton, Input, InputGroup, InputRightElement, Text, Textarea } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useCommunityStore } from '../../store/community.js';
import { usePostStore } from '../../store/post.js';
import CommunityDesc from '../components/Community Page/CommunityDesc.jsx';
import PostViewPost from '../components/Community Page/PostViewPost.jsx';
import { IoSend } from "react-icons/io5";

function PostViewPage() {
    const { fetchCommunity } = useCommunityStore();
    const { fetchPost } = usePostStore();
    const { postId } = useParams("");

    const [post, setPost] = React.useState();
    const [community, setCommunity] = React.useState();

    React.useEffect(() => {
        async function getCommunity() {
            const response = await fetchPost(postId);
            setPost(response);
            const community = await fetchCommunity(response.community_id);
            setCommunity(community);
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
                            <Input placeholder='Add a comment' size='md' borderRadius={'full'} colorScheme='teal' p={6} />
                            <InputRightElement mt={1} mr={1}>
                                <IconButton icon={<IoSend />} borderRadius={'full'} colorScheme='teal' />
                            </InputRightElement>
                        </InputGroup>
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