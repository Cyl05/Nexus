import {
    Box,
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
    VStack
} from '@chakra-ui/react';
import React from 'react';
import { useUserStore } from '../../../store/user';
import { MdArrowForwardIos } from 'react-icons/md';
import InputField from '../Input Fields/InputField.jsx';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteAccount(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { currentUser, refreshAccessToken, deleteAccount, logoutUser } = useUserStore();
    const { userId } = useParams();
    const toast = useToast();
    const navigate = useNavigate();

    const [hover, setHover] = React.useState(false);
    const [input, setInput] = React.useState({
        verification: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmit() {
        const accessToken = await refreshAccessToken();
        if (!input.verification) {
            toast({
                title: "Fill all fields",
                status: "error",
                duration: 2000,
                isClosable: true
            });
        } else if (input.verification !== props.verification) {
            toast({
                title: "Text does not match",
                status: "error",
                duration: 2000,
                isClosable: true
            });
        } else {
            const response = await deleteAccount(userId, currentUser.userId, accessToken);
            console.log(response);
            toast({
                title: response.message,
                status: (response.isSuccess ? 'success' : 'error'),
                duration: 2000,
                isClosable: true
            });
            logoutUser();
            navigate("/");
        }
    }

    return (
        <Box
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ cursor: 'pointer' }}
            mb={4}
            onClick={onOpen}
        >
            <HStack justify={'space-between'} align={'center'}>
                <VStack align={'flex-start'} spacing={-1}>
                    <Text fontWeight={500} color={'#E53E3E'}>Delete Account</Text>
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
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={5} align={'flex-start'}>
                            <Text color={'#A0AEC0'} display={'inline'}>
                                Type in the words
                                <Text fontWeight={600} color={'white'} display={'inline'} mx={1.5}>
                                    "CONFIRM"
                                </Text> 
                                to confirm account deletion
                            </Text>
                            <InputField
                                name={'verification'}
                                placeholder={'Verify'}
                                handleChange={handleChange}
                                value={input.verification}
                                full={true}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} borderRadius={'full'} onClick={handleSubmit}>
                            Delete
                        </Button>
                        <Button variant='ghost' borderRadius={'full'} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default DeleteAccount;