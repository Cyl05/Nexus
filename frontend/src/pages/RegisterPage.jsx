import React from 'react';
import { AbsoluteCenter, Box, Button, Heading, HStack, Image, Input, InputGroup, InputLeftElement, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useUserStore } from '../../store/user';

function RegisterPage() {
    const [show, setShow] = React.useState(false);
    const [userInput, setUserInput] = React.useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    const handleClick = () => setShow(!show);
    const { registerUser } = useUserStore();
    const toast = useToast();

    function handleChange(event) {
        const {name, value} = event.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    }

    async function handleSubmit() {
        if (userInput.password !== userInput.confirmPassword) {
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
            setUserInput({
                username: "",
                password: "",
                confirmPassword: ""
            });
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
                        <InputGroup w="70%">
                            <InputLeftElement>
                                <FaUser />
                            </InputLeftElement>
                            <Input
                                name='username'
                                variant={'flushed'}
                                placeholder='Username'
                                focusBorderColor={'teal.300'}
                                onChange={handleChange}
                                value={userInput.username}
                            />
                        </InputGroup>
                        <InputGroup w={'70%'}>
                            <InputLeftElement>
                                <FaLock />
                            </InputLeftElement>
                            <Input
                                name='password'
                                variant={'flushed'}
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                focusBorderColor={'teal.300'}
                                onChange={handleChange}
                                value={userInput.password}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup w={'70%'}>
                            <InputLeftElement>
                                <FaLock />
                            </InputLeftElement>
                            <Input
                                name='confirmPassword'
                                variant={'flushed'}
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Confirm password'
                                focusBorderColor={'teal.300'}
                                onChange={handleChange}
                                value={userInput.confirmPassword}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button colorScheme='teal' mt={4} onClick={handleSubmit}>
                            Submit
                        </Button>
                    </VStack>
                </Box>
            </HStack>
        </AbsoluteCenter>

    )
}

export default RegisterPage