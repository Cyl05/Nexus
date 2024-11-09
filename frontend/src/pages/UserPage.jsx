import React from 'react';
import Navbar from '../components/Page Elements/Navbar.jsx';
import Sidebar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
import { Box, Divider, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../store/user.js';
import UserTabs from '../components/PageComponents/Profile Pages/UserTabs.jsx';
import WideButton from '../components/Misc/WideButton.jsx';
import { FaEdit, FaUser } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
import { TiUserDelete } from "react-icons/ti";

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
                    <Box w={'70%'} borderRight={'2px solid #3c4b67'}>
                        <Box w={'70%'} display={'block'} mx={'auto'} mt={5}>
                            <HStack spacing={4}>
                                <Image src={user.profile_picture} w={12} borderRadius={'full'} />
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
                    <Box w={'30%'} mt={5}>
                        <WideButton
                            icon={<FaUser />}
                            name={'Profile'}
                            width={'full'}
                            margin={1}
                            active={true}
                        />
                        <WideButton
                            icon={<FaEdit />}
                            name={'Edit Profile'}
                            width={'full'}
                            margin={1}
                            href={`/user/${userId}/edit`}
                        />
                        <WideButton icon={<FaShield />} name={'Security'} width={'full'} margin={1} />
                        <WideButton 
                            icon={<IoLogOut />}
                            name={'Log Out'}
                            color={'red.500'}
                            width={'full'}
                            margin={1}
                        />
                    </Box>
                </HStack>
            </MainContent>
        </Box>
    )
}

export default UserPage;