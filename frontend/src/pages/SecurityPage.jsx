import { 
    Box,
    Divider,
    Heading,
    HStack, 
    Icon, 
    Text,
    VStack
} from '@chakra-ui/react';
import React from 'react';
import Navbar from '../components/Page Elements/Navbar';
import SideBar from '../components/Page Elements/SideBar';
import MainContent from '../components/Page Elements/MainContent';
import { useParams } from 'react-router-dom';
import VerticalTabs from '../components/PageComponents/Profile Pages/VerticalTabs';
import { useUserStore } from '../../store/user';
import { MdArrowForwardIos } from 'react-icons/md';
import SecurityOption from '../components/PageComponents/Profile Pages/SecurityOption';

function SecurityPage() {
    const { userId } = useParams();
    const { currentUser } = useUserStore();
    const [hover, setHover] = React.useState(false);

    return (
        <Box>
            <Navbar />
            <SideBar />
            <MainContent>
                <HStack align={'flex-start'}>
                    <Box w={'70%'} borderRight={'2px solid #3c4b67'} p={5} h={'100vh'}>
                        <Heading>Security</Heading>
                        <Divider bgColor={'#3c4b67'} my={5} />
                        <Box px={5} w={'full'}>
                            <SecurityOption userId={userId} />
                            <Box 
                                onMouseEnter={() => setHover(true)} 
                                onMouseLeave={() => setHover(false)} 
                                style={{ cursor: 'pointer' }}
                            >
                                <HStack justify={'space-between'} align={'center'}>
                                    <VStack align={'flex-start'} spacing={-1}>
                                        <Text fontWeight={500}>Change Password</Text>
                                        <Text color={'gray.400'} fontSize={13}>Change password of your account</Text>
                                    </VStack>
                                    <Box 
                                        borderRadius={'full'}
                                        padding={3}
                                        filter={hover ? "brightness(1.5)" : null}
                                        bgColor={'#1A202C'}
                                    >
                                        <MdArrowForwardIos />
                                    </Box>
                                </HStack>
                            </Box>
                        </Box>
                    </Box>
                    <VerticalTabs active={3} userId={userId} />
                </HStack>
            </MainContent>
        </Box>
    )
}

export default SecurityPage;