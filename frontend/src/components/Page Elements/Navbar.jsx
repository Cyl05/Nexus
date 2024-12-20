import React from 'react';
import { Box, Button, Container, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { CgInfinity } from "react-icons/cg";
import { useUserStore } from '../../../store/user.js';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import CreateButton from '../Misc/CreateButton.jsx';
import UserProfileButton from '../Misc/UserProfileButton.jsx';
import SearchBar from './SearchBar.jsx';

function Navbar() {
    const { currentUser, getUserData } = useUserStore();
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        async function getData () {
            if (currentUser) {
                const user = await getUserData(currentUser.userId);
                setUser(user);
            }
        }
        getData();
    }, [user]);

    return (
        <Container
            w={"100vw"}
            h={'10vh'}
            py={4}
            px={10}
            borderBottom={"2px solid #3c4b67"}
            boxShadow={'lg'}
            bgColor={'#1A202C'}
            pos={'fixed'}
            top={0}
            left={0}
            right={0}
            maxW={'100%'}
            zIndex={1000}
        >
            <HStack justifyContent={"space-between"} align={'flex-start'}>
                <Box>
                    <HStack>
                        <Icon as={CgInfinity} color={"#00FFFF"} boxSize={9} />
                        <Text fontSize={"xl"} fontWeight={"bold"} fontFamily={"Reddit Sans"}>Nexus</Text>
                    </HStack>
                </Box>
                <SearchBar />
                <Box>
                    <HStack spacing={'10px'}>
                        {
                            user ?
                            <HStack spacing={'10px'}>
                                <CreateButton />
                                <UserProfileButton user={user} />
                            </HStack>
                            :
                            <Button colorScheme='teal' borderRadius={'20px'} onClick={() => navigate("/login")}>Login</Button>
                        }
                    </HStack>
                </Box>
            </HStack>
        </Container>
    );
}

export default Navbar