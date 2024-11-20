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
import { useNavigate, useParams } from 'react-router-dom';
import VerticalTabs from '../components/User Pages/VerticalTabs';
import { useUserStore } from '../../store/user';
import ChangePassword from '../components/User Pages/ChangePassword';
import DeleteAccount from '../components/User Pages/DeleteAccount';

function SecurityPage() {
    const { userId } = useParams();
    const { currentUser } = useUserStore();
    const navigate = useNavigate();

    const [correctUser, setCorrectUser] = React.useState(true);

    function redirect() {
        if (currentUser.userId != userId) {
            setCorrectUser(false);
            navigate(-1);
        }
    }

    React.useEffect(() => {
        redirect();
    }, []);

    return (
        correctUser &&
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
                            <DeleteAccount verification={"CONFIRM"} />
                        </Box>
                    </Box>
                    <VerticalTabs active={3} userId={userId} />
                </HStack>
            </MainContent>
        </Box>
    )
}

export default SecurityPage;