import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AbsoluteCenter, Box, Button, Heading, HStack, Image, Link, Text, textDecoration, useToast, VStack } from '@chakra-ui/react';
import { useUserStore } from '../../store/user.js';
import InputField from '../components/Input Fields/InputField.jsx';
import PasswordField from '../components/Input Fields/PasswordField.jsx';
import LinkText from '../components/Misc/LinkText.jsx';


function LoginPage() {
    const [userInput, setUserInput] = React.useState({
        username: "",
        password: ""
    });
    const { loginUser, fetchUser } = useUserStore();
    const toast = useToast();
    const navigate = useNavigate();

    function handleChange(event) {
        const {name, value} = event.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    async function handleSubmit() {
        if (!userInput.username || !userInput.password) {
            toast({
                title: 'Provide all fields',
                status: 'error',
                duration: 2000,
                isClosable: true
            }); 
        } else {
            const response = await loginUser(userInput);
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
                <Box w={'50%'} h={'full'} alignContent={'center'}>
                    <VStack spacing={6}>
                        <Heading mb={3}>
                            Login
                        </Heading>
                        <InputField
                            name="username"
                            placeholder="Enter username"
                            handleChange={handleChange}
                            inputValue={userInput.username}
                            icon={true}
                        />
                        <PasswordField
                            name="password"
                            placeholder="Enter password"
                            handleChange={handleChange}
                            inputValue={userInput.password}
                            variant={'flushed'}
                            icon={true}
                        />
                        <Button colorScheme='teal' mt={4} onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Text>Already have an account? <LinkText url='/register' color='#81E6D9' text="Register" /></Text>
                    </VStack>
                </Box>
                <Image
                    src={'../../public/RegisterPageArt.png'}
                    w={'50%'}
                    h={'full'}
                    objectFit={'cover'}
                    borderRightRadius={'20px'}
                />
            </HStack>
        </AbsoluteCenter>
    )
}

export default LoginPage;