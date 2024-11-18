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
import VerticalTabs from '../components/User Pages/VerticalTabs';
import { useUserStore } from '../../store/user';
import { MdArrowForwardIos } from 'react-icons/md';
import ChangePassword from '../components/User Pages/ChangePassword';
import DeleteAccount from '../components/User Pages/DeleteAccount';

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
                            <ChangePassword userId={userId} />
                            <DeleteAccount verification={"Confirm"} />
                        </Box>
                    </Box>
                    <VerticalTabs active={3} userId={userId} />
                </HStack>
            </MainContent>
        </Box>
    )
}

export default SecurityPage;