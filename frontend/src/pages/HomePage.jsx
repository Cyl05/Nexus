import React from 'react';
import Navbar from "../components/Page Elements/Navbar.jsx";
import { useUserStore } from '../../store/user.js';
import SideBar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
import { Box, Heading, VStack } from '@chakra-ui/react';
import Post from '../components/Page Elements/Post.jsx';

function HomePage() {
    const { currentUser, fetchTopCommunities } = useUserStore();

    const [topPosts, setTopPosts] = React.useState();

    React.useEffect(() => {
        async function fetchTopComms() {
            const topPost = await fetchTopCommunities(currentUser.userId);
            setTopPosts(topPost.data);
        }
        fetchTopComms();
    }, []);


    return (
        <Box>
            <Navbar />
            <SideBar />
            <MainContent>
                <Box w={'80%'} p={5} m={'auto'}>
                    <VStack spacing={5}>
                        {topPosts && topPosts.map((post) => (
                            <Post key={post.id} post={post} communityId={post.community_id} communityView={false} />
                        ))}
                    </VStack>
                </Box>
            </MainContent>
        </Box>
    )
}

export default HomePage