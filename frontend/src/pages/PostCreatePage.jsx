import React from 'react';
import Navbar from '../components/Page Elements/Navbar';
import SideBar from '../components/Page Elements/SideBar';
import MainContent from '../components/Page Elements/MainContent';
import { Box, Button, Divider, Heading, HStack, Image, Input, Menu, MenuButton, MenuItem, MenuList, Text, Textarea, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useCommunityStore } from '../../store/community';
import { useUserStore } from '../../store/user';
import CommunityItem from '../components/Create Pages/CommunityItem';
import FancyInput from '../components/Input Fields/FancyInput';
import { usePostStore } from '../../store/post';
import { useNavigate } from 'react-router-dom';

function PostCreatePage() {
    const toast = useToast();
    const navigate = useNavigate();

    const { fetchUserCommunities } = useCommunityStore();
    const { currentUser, refreshAccessToken } = useUserStore();
    const { createPost } = usePostStore();

    const [communitiesList, setCommunitiesList] = React.useState();
    const [activeCommunity, setActiveCommunity] = React.useState();
    const [input, setInput] = React.useState({
        title: "",
        body: "",
        image: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmit() {
        if (!input.title || !activeCommunity) {
            toast({
                title: "Fill all fields",
                status: "error",
                duration: 2000,
                isClosable: true
            });
            return null;
        }
        const accessToken = await refreshAccessToken();
        const response = await createPost(currentUser.userId, accessToken, input, activeCommunity.id);
        toast({
            title: response.message,
            status: (response.isSuccess ? 'success' : 'error'),
            duration: 2000,
            isClosable: true
        });
        if (response.isSuccess) {
            navigate(`/post/${response.data.id}`);
        }
    }

    React.useEffect(() => {
        async function getCommunitiesList () {
            const accessToken = await refreshAccessToken();
            const response = await fetchUserCommunities(currentUser.userId, accessToken);
            setCommunitiesList(response.data);
        }
        getCommunitiesList();
    }, []);

    return (
        <Box>
            <Navbar />
            <SideBar />
            <MainContent>
                <Box h={'100vh'} m={'auto'} p={5} mr={0}>
                    <Heading>Create a Post:</Heading>
                    <Divider bgColor={'#343E5B'} my={5} />
                    <Heading size={'md'} my={4}>Choose Community:</Heading>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w={'60%'} textAlign={'left'} mb={4}>
                            {
                                activeCommunity 
                                ? <CommunityItem icon={activeCommunity.icon} name={activeCommunity.name} />
                                : "Choose a community"
                            }
                        </MenuButton>
                        <MenuList w={'100vh'}>
                            {communitiesList && communitiesList.map(community => {
                                return (<MenuItem key={community.id} onClick={() => setActiveCommunity(community)}>
                                    <CommunityItem icon={community.icon} name={community.name} />
                                </MenuItem>);
                            })}
                        </MenuList>
                    </Menu>
                    <FancyInput 
                        head={'Title*'}
                        placeholder={'Post title'}
                        name={'title'}
                        handleChange={handleChange}
                        value={input}
                        w={'60%'}
                    />
                    <FancyInput
                        head={'Body:'}
                        placeholder={'Post body'}
                        name={'body'}
                        handleChange={handleChange}
                        value={input}
                        w={'60%'}
                        textArea={true}
                    />
                    <FancyInput 
                        head={'Image'}
                        placeholder={'Image'}
                        name={'image'}
                        handleChange={handleChange}
                        value={input}
                        w={'60%'}
                    />
                    <HStack>
                        <Button colorScheme='teal' borderRadius={'full'} onClick={handleSubmit}>Create Post</Button>
                        <Button variant={'outline'} borderRadius={'full'} onClick={() => navigate('/')}>Cancel</Button>
                    </HStack>
                </Box>
            </MainContent>
        </Box>
    )
}

export default PostCreatePage;