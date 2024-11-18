import React from 'react';
import Navbar from '../components/Page Elements/Navbar';
import SideBar from '../components/Page Elements/SideBar';
import MainContent from '../components/Page Elements/MainContent';
import {
    Box,
    Button,
    Divider,
    Heading,
    HStack,
    Image,
    useToast,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import FancyInput from '../components/Input Fields/FancyInput.jsx';
import { useUserStore } from '../../store/user';
import VerticalTabs from '../components/User Pages/VerticalTabs.jsx';

function EditUserPage() {
    const { userId } = useParams();
    const { getUserData, editUser, refreshAccessToken } = useUserStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const navigate = useNavigate();

    const [user, setUser] = React.useState();

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    async function handleSubmit() {
        const accessToken = await refreshAccessToken();
        if (!user.username || !user.display_name) {
            toast({
                title: "Fill all necessary fields",
                status: "error",
                duration: 2000,
                isClosable: true
            });
        } else {
            const response = await editUser(userId, user, accessToken);
            toast({
                title: response.message,
                status: (response.isSuccess ? 'success' : 'error'),
                duration: 2000,
                isClosable: true
            });
            { response.isSuccess ? navigate(`/user/${userId}`) : null }
        }
    }

    React.useEffect(() => {
        async function getUser() {
            const response = await getUserData(userId);
            setUser(response);
            console.log(response);
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
                        <Box px={5}>
                            <HStack spacing={5} mb={5}>
                                <VStack>
                                    <Image src={user.profile_picture} w={40} borderRadius={10} />
                                    <Button variant={'outline'} colorScheme='teal' borderRadius={'full'}>Upload Picture</Button>
                                </VStack>
                                <Box w={'70%'}>
                                    <FancyInput
                                        head={'Display Name:'}
                                        name={'display_name'}
                                        placeholder={'Display Name'}
                                        handleChange={handleChange}
                                        value={user}
                                        w={'full'}
                                    />
                                    <FancyInput
                                        head={'Username:'}
                                        name={'username'}
                                        placeholder={'Username'}
                                        handleChange={handleChange}
                                        value={user}
                                        w={'full'}
                                    />
                                </Box>
                            </HStack>
                            <FancyInput
                                head={'Bio:'}
                                name={'bio'}
                                placeholder={'Bio'}
                                handleChange={handleChange}
                                value={user}
                                w={'full'}
                                textArea={true}
                            />
                            <HStack>
                                <Button colorScheme='teal' borderRadius={'full'} onClick={handleSubmit}>Save</Button>
                                <Button onClick={onOpen}>Open Modal</Button>
                            </HStack>
                        </Box>
                    </Box>
                    <VerticalTabs active={2} userId={userId} />
                </HStack>
            </MainContent>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Profile Picture</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FancyInput
                            head={'Profile Picture: '}
                            name={'profile_picture'}
                            placeholder={'Profile Picture'}
                            handleChange={handleChange}
                            value={user}
                            w={'full'}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default EditUserPage;