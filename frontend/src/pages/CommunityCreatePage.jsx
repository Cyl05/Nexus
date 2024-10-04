import React from 'react';
import Navbar from '../components/Page Elements/Navbar';
import SideBar from '../components/Page Elements/SideBar';
import MainContent from '../components/Page Elements/MainContent';
import { Box, Button, Divider, Heading, HStack, Image, Input, InputGroup, InputLeftElement, Radio, RadioGroup, Stack, Text, VStack } from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa6';
import { MdFormatPaint, MdTextSnippet, MdTitle } from "react-icons/md";
import FancyInput from '../components/Input Fields/FancyInput';
// import './styles.css';

function CreatePage() {
    const [value, setValue] = React.useState('1');

    return (
        <Box overflowX={'hidden'}>
            <Navbar />
            <SideBar />
            <MainContent mr={0}>
                <Box h={'100vh'} m={'auto'} p={5} mr={0}>
                    <Heading>Create a Community:</Heading>
                    <Divider bgColor={'#343E5B'} my={5} />
                    <HStack justify={'space-between'} spacing={0}>
                        <Box w={'56%'} h={'50vh'} px={3}>
                            <FancyInput name={'Name*'} placeholder={'Community Name'} icon={<MdTextSnippet />} />
                            <FancyInput name={'Icon'} placeholder={'Icon URL'} icon={<FaImage />} />

                            <FancyInput name={'Banner'} placeholder={'Banner URL'} icon={<FaImage />} />
                            <Box mb={3}>
                                <Heading size={'md'} as={'h5'}>Banner</Heading>
                                <RadioGroup onChange={setValue} value={value} mt={3}>
                                    <Stack direction='row'>
                                        <Radio value='1'>First</Radio>
                                        <Radio value='2'>Second</Radio>
                                    </Stack>
                                </RadioGroup>
                                <InputGroup>
                                    <InputLeftElement pointerEvents='none' my={4}>
                                        <MdFormatPaint />
                                    </InputLeftElement>
                                    {value === 1
                                        ? <Input placeholder={"Banner URL"} size='md' my={4} />
                                        : <Input placeholder={"Banner AAAAAAAAA"} size='md' my={4} />
                                    }
                                </InputGroup>
                            </Box>

                            <FancyInput name={'Description Title* '} placeholder={'Description Title'} icon={<MdTitle />} />
                            <FancyInput name={'Description* '} placeholder={'Community Description'} textArea={true} />
                        </Box>
                        <Box w={'40%'} h={'50vh'} border={'10px solid gray'} borderRadius={20} p={3} mr={0} boxShadow='dark-lg'>
                            <Image
                                position={'relative'}
                                src={'https://new.growketing.com/wp-content/uploads/2022/11/98-%C2%BFQue-es-y-como-aprovechar-al-maximo-Google-AdSense_.jpg'}
                                borderTopRadius={10}
                                w={'100%'}
                                h={'20vh'}
                            />
                            <Image
                                position={'relative'}
                                top={-10}
                                left={1}
                                borderRadius={'full'}
                                border={'5px solid #3C4B67'}
                                src={'https://new.growketing.com/wp-content/uploads/2022/11/98-%C2%BFQue-es-y-como-aprovechar-al-maximo-Google-AdSense_.jpg'}
                                w={'40'}
                                h={'40'}
                            />
                            <VStack
                                position={'relative'}
                                top={'-21vh'}
                                left={'43%'}
                                align={'space-between'}
                                w={'80%'}
                            >
                                <Text
                                    color={'white'}
                                    fontSize={40}
                                    fontFamily={'Reddit Sans'}
                                    fontWeight={'700'}
                                >
                                    My Name
                                </Text>
                                <Button
                                    w={'20%'}
                                    borderRadius={'full'}
                                    bgColor={'white'}
                                    color={'#1A202C'}
                                // onClick={props.handleJoin}
                                >Join</Button>
                            </VStack>
                        </Box>
                    </HStack>
                </Box>
            </MainContent>
        </Box>
    )
}

export default CreatePage;