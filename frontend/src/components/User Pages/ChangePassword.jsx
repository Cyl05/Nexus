import {
    Box,
    HStack,
    Text,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
} from '@chakra-ui/react';
import React from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import PasswordField from '../Input Fields/PasswordField';
import { useUserStore } from '../../../store/user';

function SecurityOption(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { refreshAccessToken, changePassword } = useUserStore();
    const toast = useToast();

    const [hover, setHover] = React.useState(false);
    const [input, setInput] = React.useState({
        old_pwd: "",
        new_pwd: "",
        verify_pwd: ""
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
        if (!input.new_pwd || !input.verify_pwd || !input.old_pwd) {
            toast({
                title: "Fill all fields",
                status: "error",
                duration: 2000,
                isClosable: true
            });
        } else if (input.new_pwd !== input.verify_pwd) {
            toast({
                title: "Passwords do not match",
                status: "error",
                duration: 2000,
                isClosable: true
            });
        } else {
            const response = await changePassword(props.userId, input, accessToken);
            toast({
                title: response.message,
                status: (response.isSuccess ? 'success' : 'error'),
                duration: 2000,
                isClosable: true
            });
            onClose
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
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Password</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={5}>
                            <PasswordField 
                                name={'old_pwd'} 
                                placeholder={'Old Password'}
                                handleChange={handleChange}
                                inputValue={input.old_pwd}
                                full={true}
                                icon={false}
                            />
                            <PasswordField 
                                name={'new_pwd'} 
                                placeholder={'New Password'}
                                handleChange={handleChange}
                                inputValue={input.new_pwd}
                                full={true}
                                icon={false}
                            />
                            <PasswordField 
                                name={'verify_pwd'} 
                                placeholder={'Verify Password'}
                                handleChange={handleChange}
                                inputValue={input.verify_pwd}
                                full={true}
                                icon={false}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} borderRadius={'full'} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button variant='ghost' borderRadius={'full'} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default SecurityOption;