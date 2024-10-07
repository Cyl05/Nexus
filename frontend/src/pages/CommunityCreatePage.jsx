import React from 'react';
import Navbar from '../components/Page Elements/Navbar';
import SideBar from '../components/Page Elements/SideBar';
import MainContent from '../components/Page Elements/MainContent';
import { Box, Button, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa6';
import { MdFormatPaint, MdTextSnippet, MdTitle } from "react-icons/md";
import FancyInput from '../components/Input Fields/FancyInput';
import MiniCommunity from '../components/Create Pages/MiniCommunity';
import BannerInput from '../components/Create Pages/BannerInput';

function CreatePage() {
    const [input, setInput] = React.useState({
        name: "",
        icon: "",
        banner: "",
        descTitle: "",
        desc: "",
    });
    const [value, setValue] = React.useState('1');

    function handleChange (event) {
        const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <Box overflowX={'hidden'}>
            <Navbar />
            <SideBar />
            <MainContent mr={0}>
                <Box h={'100vh'} m={'auto'} p={5} mr={0}>
                    <Heading>Create a Community:</Heading>
                    <Divider bgColor={'#343E5B'} my={5} />
                    <HStack justify={'space-between'} align={'flex-start'} spacing={0}>
                        <Box w={'56%'} px={3}>
                            <FancyInput
                                head={'Name*'}
                                placeholder={'Community Name'}
                                icon={<MdTextSnippet />}
                                name={"name"}
                                handleChange={handleChange}
                                value={input}
                            />
                            <FancyInput
                                head={'Icon'}
                                placeholder={'Icon URL'}
                                icon={<FaImage />}
                                name={"icon"}
                                handleChange={handleChange}
                                value={input}
                            />
                            <BannerInput
                                name={'banner'}
                                value={input}
                                handleChange={handleChange}
                                setValue={setValue}
                                radioValue={value} 
                            />
                            <FancyInput
                                head={'Description Title* '}
                                placeholder={'Description Title'}
                                icon={<MdTitle />}
                                name={"descTitle"}
                                handleChange={handleChange}
                                value={input}
                            />
                            <FancyInput
                                head={'Description* '}
                                placeholder={'Community Description'}
                                textArea={true}
                                name={"desc"} 
                                handleChange={handleChange}
                                value={input}
                            />
                        </Box>
                        <VStack w={'40%'}>
                            <MiniCommunity input={input} image={value === '1' ? true : false} />
                            <Box w={'full'} my={7} border={'3px solid #51555E'} borderRadius={10} p={5}>
                                <Text color={'gray'} textAlign={'center'}>
                                    A default icon and banner will be assigned to your community if not uploaded
                                </Text>
                                <Button colorScheme='teal' my={3} mx={'auto'} display={'block'}>Create Community</Button>
                            </Box>
                        </VStack>
                    </HStack>
                </Box>
            </MainContent>
        </Box>
    )
}

export default CreatePage;