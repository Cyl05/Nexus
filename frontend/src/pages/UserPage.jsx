import React from 'react';
import Navbar from '../components/Page Elements/Navbar.jsx';
import Sidebar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
import { Box, Divider, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../store/user.js';
import UserTabs from '../components/User Pages/UserTabs.jsx';
import VerticalTabs from '../components/User Pages/VerticalTabs.jsx';

function UserPage() {
    const { userId } = useParams();
    const { currentUser, getUserData } = useUserStore();

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
                    <Box w={'70%'} borderRight={'2px solid #3c4b67'}>
                        <Box w={'70%'} display={'block'} mx={'auto'} mt={5}>
                            <HStack spacing={4}>
                                <Image
                                    src={user.profile_picture} 
                                    w={12}
                                    borderRadius={'full'}
                                    border={'2px solid #A0AEC0'}
                                    objectFit={'cover'}
                                    h={12}
                                />    
                                <VStack spacing={0} align={'flex-start'}>
                                    <Heading size={'lg'}>{user.display_name}</Heading>
                                    <Text color={'gray'}>@{user.username}</Text>
                                </VStack>
                            </HStack>
                            <Box bgColor={'#2D384D'} w={'full'} my={5} borderRadius={10} py={5} px={8}>
                                <Text fontSize={20} fontWeight={'700'} mb={3}>Bio</Text>
                                <Text my={3}>{user.bio}</Text>
                            </Box>
                            <UserTabs user={user} />
                        </Box>
                    </Box>
                    {currentUser.userId == user.id ? <VerticalTabs active={1} userId={userId} /> : <></>}
                </HStack>
            </MainContent>
        </Box>
    )
}

export default UserPage;