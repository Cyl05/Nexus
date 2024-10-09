import React from 'react';
import Navbar from '../components/Page Elements/Navbar';
import SideBar from '../components/Page Elements/SideBar';
import MainContent from '../components/Page Elements/MainContent';
import { Box, Button, Divider, Heading, HStack, Image, Input, Menu, MenuButton, MenuItem, MenuList, Text, Textarea } from '@chakra-ui/react';
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useCommunityStore } from '../../store/community';
import { useUserStore } from '../../store/user';
import CommunityItem from '../components/Create Pages/CommunityItem';
import FancyInput from '../components/Input Fields/FancyInput';

function PostCreatePage() {
    const { fetchUserCommunities } = useCommunityStore();
    const { currentUser, refreshAccessToken } = useUserStore();

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
        console.log(input);
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
                        <Button colorScheme='teal' borderRadius={'full'}>Create Post</Button>
                        <Button variant={'outline'} borderRadius={'full'}>Cancel</Button>
                    </HStack>
                </Box>
            </MainContent>
        </Box>
    )
}

export default PostCreatePage;