import React from 'react';
import Navbar from '../components/Page Elements/Navbar';
import SideBar from '../components/Page Elements/SideBar';
import MainContent from '../components/Page Elements/MainContent';
import { Box, Button, Divider, Heading, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa6';
import { MdTextSnippet, MdTitle } from "react-icons/md";
import FancyInput from '../components/Input Fields/FancyInput';
import MiniCommunity from '../components/Create Pages/MiniCommunity';
import BannerInput from '../components/Create Pages/BannerInput';
import { useCommunityStore } from '../../store/community';
import { useUserStore } from '../../store/user';
import { useNavigate, useParams } from 'react-router-dom';

function EditCommunityPage() {
    const toast = useToast();
    const navigate = useNavigate();

    const { communityId } = useParams();
    const [community, setCommunity] = React.useState();
    const [input, setInput] = React.useState({
        name: "",
        icon: "",
        banner: "",
        descTitle: "",
        desc: "",
    });
    const [value, setValue] = React.useState('1');
    const [randomColor, setRandomColor] = React.useState();

    const { fetchCommunity, editCommunity } = useCommunityStore();
    const { currentUser, refreshAccessToken } = useUserStore();

    React.useEffect(() => {
        function checkUser(community) {
            if (community.created_by !== currentUser.userId) {
                navigate(`/community/${community.id}`);
            }
        }
        function setRadio(banner) {
            if (banner.includes('http')) {
                setValue('2');
            } else {
                setValue('1');
            }
        }
        async function getCommunity() {
            const response = await fetchCommunity(communityId);
            setInput({
                name: response.name,
                icon: response.icon,
                banner: response.banner,
                descTitle: response.description_title,
                desc: response. description
            });
            setRadio(response.banner);
            checkUser(response);
        }
        getCommunity();
    }, []);

    function handleChange (event) {
        const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmit () {
        let response;
        try {
            const accessToken = await refreshAccessToken();
            if (!input.name || !input.desc || !input.descTitle) {
                toast({
                    title: "Fill all fields",
                    status: "error",
                    duration: 2000,
                    isClosable: true
                });
            } else if (input.banner.length === 0) {
                response = await editCommunity(communityId, input, accessToken, randomColor);
            } else {
                response = await editCommunity(communityId, input, accessToken);
            }
            toast({
                title: response.message,
                status: (response.isSuccess ? 'success' : 'error'),
                duration: 2000,
                isClosable: true
            });
            if (response.isSuccess) {
                navigate(`/community/${response.data.id}`);
            }
        } catch (error) {
            console.log(error);
        }
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
                            <MiniCommunity
                                input={input}
                                image={value === '1' ? false : true}
                                randomColor={randomColor}
                                setColor={setRandomColor}
                            />
                            <Box w={'full'} my={7} border={'3px solid #51555E'} borderRadius={10} p={5}>
                                <Text color={'gray'} textAlign={'center'}>
                                    A default icon and banner will be assigned to your community if not uploaded
                                </Text>
                                <Button colorScheme='teal' my={3} mx={'auto'} display={'block'} onClick={handleSubmit}>
                                    Edit Community
                                </Button>
                            </Box>
                        </VStack>
                    </HStack>
                </Box>
            </MainContent>
        </Box>
    )
}

export default EditCommunityPage;