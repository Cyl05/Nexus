import React from 'react';
import SideBar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
import Navbar from "../components/Page Elements/Navbar.jsx";
import { Box, Divider, Heading, HStack, Text } from '@chakra-ui/react';
import { useLocation, useParams } from 'react-router-dom';
import { useCommunityStore } from '../../store/community.js';
import { usePostStore } from '../../store/post.js';
import CommunityDesc from '../components/Community Page/CommunityDesc.jsx';
import Post from '../components/Page Elements/Post.jsx';
import PostViewPost from '../components/Community Page/PostViewPost.jsx';

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
                    <PostViewPost community={community} post={post} />
                    <CommunityDesc 
                        community={community} postView={true}
                    />
                </HStack>
            </MainContent>
        </Box>
    )
}

export default PostViewPage;