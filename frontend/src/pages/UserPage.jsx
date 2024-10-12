import React from 'react';
import Navbar from '../components/Page Elements/Navbar.jsx';
import Sidebar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
import { Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../store/user.js';
import UserTabs from '../components/PageComponents/Profile Pages/UserTabs.jsx';

function UserPage() {
    const { userId } = useParams();
    const { getUserData } = useUserStore();

    const [user, setUser] = React.useState();
    const [comments, setComments] = React.useState();

    React.useEffect(() => {
        async function getData () {
            const response = await getUserData(userId);
            setUser(response);
        }
        getData();
    });

    // async function getComments

    return (
        user &&
        <Box>
            <Navbar />
            <Sidebar />
            <MainContent>
                <HStack align={'flex-start'}>
                    <Box w={'70%'}>
                        <Box w={'70%'} h={'100vh'} display={'block'} mx={'auto'} mt={5}>
                            <HStack spacing={4}>
                                <Image src={user.profile_picture} w={12} borderRadius={'full'} />
                                <VStack spacing={0} align={'flex-start'}>
                                    <Heading size={'lg'}>{user.display_name}</Heading>
                                    <Text color={'gray'}>@{user.username}</Text>
                                </VStack>
                            </HStack>
                            <Box bgColor={'#2D384D'} w={'full'} my={5} borderRadius={10} py={5} px={8}>
                                <Text fontSize={20} fontWeight={'700'} mb={3}>BIO</Text>
                                <Text my={3}>{user.bio}</Text>
                            </Box>
                            <UserTabs user={user} />
                        </Box>
                    </Box>
                    <Box w={'30%'} bgColor={'green'} h={'20vh'}></Box>
                </HStack>
            </MainContent>
        </Box>
    )
}

export default UserPage;