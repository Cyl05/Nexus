import React from 'react';
import Navbar from '../components/Page Elements/Navbar';
import SideBar from '../components/Page Elements/SideBar';
import MainContent from '../components/Page Elements/MainContent';
import { Box, Divider, Heading, HStack, Text } from '@chakra-ui/react';
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
                    <HStack justify={'space-between'} spacing={0}>
                        <Box w={'56%'} h={'50vh'} px={3}>
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
                        <MiniCommunity input={input} image={value === '1' ? true : false} />
                    </HStack>
                </Box>
            </MainContent>
        </Box>
    )
}

export default CreatePage;