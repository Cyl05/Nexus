import React from 'react';
import { AbsoluteCenter, Box, Button, Heading, HStack, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Text, useToast, VStack } from '@chakra-ui/react';
import { useUserStore } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import PasswordField from '../components/Input Fields/PasswordField.jsx';
import InputField from '../components/Input Fields/InputField.jsx';
import LinkText from '../components/Misc/LinkText.jsx';

function RegisterPage() {
    const [userInput, setUserInput] = React.useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    const { registerUser, fetchUser } = useUserStore();
    const toast = useToast();
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    async function handleSubmit() {
        if (!userInput.username || !userInput.password || !userInput.confirmPassword) {
            toast({
                title: 'Provide all fields',
                status: 'error',
                duration: 2000,
                isClosable: true
            }); 
        } else if (userInput.password !== userInput.confirmPassword) {
            toast({
                title: 'Password Mismatch',
                status: 'error',
                duration: 2000,
                isClosable: true
            });
        } else {
            const response = await registerUser(userInput);
            toast({
                title: response.message,
                status: (response.isSuccess ? 'success' : 'error'),
                duration: 2000,
                isClosable: true
            });
            if (response.isSuccess) {
                setUserInput({
                    username: "",
                    password: "",
                    confirmPassword: ""
                });
                await fetchUser(response.accessToken, response.refreshToken);
                navigate('/');
            }
        }
    }

    return (
        <AbsoluteCenter minW={'70%'} h={'80vh'} bgColor={'#2D374D'} borderRadius={'20px'} boxShadow={'dark-lg'}>
            <HStack h={'full'} justify={'space-between'}>
                <Image
                    src={'../../public/RegisterPageArt.png'}
                    w={'50%'}
                    h={'full'}
                    objectFit={'cover'}
                    borderLeftRadius={'20px'}
                />
                <Box w={'50%'} h={'full'} alignContent={'center'}>
                    <VStack spacing={6}>
                        <Heading mb={3}>
                            Register
                        </Heading>
                        <InputField 
                            name="username"
                            placeholder="Enter username"
                            handleChange={handleChange}
                            inputValue={userInput.username}
                        />
                        <PasswordField
                            name="password"
                            placeholder="Enter password"
                            handleChange={handleChange}
                            inputValue={userInput.password}
                            variant={'flushed'}
                        />
                        <PasswordField
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            handleChange={handleChange}
                            inputValue={userInput.confirmPassword}
                            variant={'flushed'}
                        />
                        <Button colorScheme='teal' mt={4} onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Text>Already have an account? <LinkText url='/login' color='#81E6D9' text="Login" /></Text>
                    </VStack>
                </Box>
            </HStack>
        </AbsoluteCenter>

    )
}

export default RegisterPage