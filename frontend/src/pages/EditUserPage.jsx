import React from 'react';
import Navbar from '../components/Page Elements/Navbar';
import SideBar from '../components/Page Elements/SideBar';
import MainContent from '../components/Page Elements/MainContent';
import { Box, Button, Divider, Heading, HStack, Image, VStack } from '@chakra-ui/react';
import WideButton from '../components/Misc/WideButton';
import { FaShield, FaUser } from 'react-icons/fa6';
import { FaEdit } from 'react-icons/fa';
import { TiUserDelete } from 'react-icons/ti';
import { useParams } from 'react-router-dom';
import { IoLogOut } from 'react-icons/io5';
import { useUserStore } from '../../store/user';

function EditUserPage() {
    const { userId } = useParams();
    const { getUserData } = useUserStore();

    const [user, setUser] = React.useState();

    React.useEffect(() => {
        async function getUser() {
            const response = await getUserData(userId);
            setUser(response);
        }
        getUser();
    }, []);

    return (
        user &&
        <Box>
            <Navbar />
            <SideBar />
            <MainContent>
                <HStack align={'flex-start'}>
                    <Box w={'70%'} borderRight={'2px solid #3c4b67'} p={5} h={'100vh'}>
                        <Heading>Edit Profile</Heading>
                        <Divider bgColor={'#3c4b67'} my={5} />
                        <HStack>
                            <VStack>
                                <Image src={user.profile_picture} w={40} borderRadius={10} />
                                <Button variant={'outline'} colorScheme='teal' borderRadius={'full'}>Change Picture</Button>
                            </VStack>
                        </HStack>
                    </Box>
                    <Box w={'30%'} mt={5}>
                        <WideButton
                            icon={<FaUser />}
                            name={'Profile'}
                            width={'full'}
                            margin={1}
                            href={`/user/${userId}`}
                        />
                        <WideButton
                            icon={<FaEdit />}
                            name={'Edit Profile'}
                            width={'full'}
                            margin={1}
                            active={true}
                        />
                        <WideButton icon={<FaShield />} name={'Security'} width={'full'} margin={1} />
                        <WideButton 
                            icon={<IoLogOut />}
                            name={'Log Out'}
                            color={'red.500'}
                            width={'full'}
                            margin={1}
                        />
                        <WideButton
                            icon={<TiUserDelete />} 
                            name={'Delete Account'} 
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

export default EditUserPage;