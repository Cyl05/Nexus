import React from 'react';
import Navbar from "../components/Page Elements/Navbar.jsx";
import { useUserStore } from '../../store/user.js';
import SideBar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
import { Box, Heading } from '@chakra-ui/react';

function HomePage() {
    const { currentUser, fetchTopCommunities } = useUserStore();

    const [topCommunities, setTopCommunities] = React.useState();

    React.useEffect(() => {
        async function fetchTopComms() {
            const topComms = await fetchTopCommunities(currentUser.userId);
            setTopCommunities(topComms);
        }
        fetchTopComms();
    }, []);

    return (
        <Box>
            <Navbar />
            <SideBar />
            <MainContent>
                <Box>
                    <Heading>Hello</Heading>
                </Box>
            </MainContent>
        </Box>
    )
}

export default HomePage