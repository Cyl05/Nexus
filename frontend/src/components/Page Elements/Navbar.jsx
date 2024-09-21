import React from 'react';
import { Box, Button, Container, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { CgInfinity } from "react-icons/cg";
import { useUserStore } from '../../../store/user.js';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";

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
            pos={'fixed'}
            top={0}
            left={0}
            right={0}
            maxW={'100%'}
        >
            <HStack justifyContent={"space-between"}>
                <Box>
                    <HStack>
                        <Icon as={CgInfinity} color={"#00FFFF"} boxSize={9} />
                        <Text fontSize={"xl"} fontWeight={"bold"} fontFamily={"Reddit Sans"}>Nexus</Text>
                    </HStack>
                </Box>
                <Box>
                    <HStack spacing={'10px'}>
                        {
                            user ?
                            <HStack spacing={'10px'}>
                                <Button leftIcon={<FaPlus />} colorScheme='teal' variant={'outline'} borderRadius={'20px'}>
                                    Create
                                </Button>
                                <IconButton
                                    isRound={true}
                                    variant='solid'
                                    aria-label='Done'
                                    fontSize='20px'
                                    backgroundImage={user ? user.profile_picture : null}
                                    bgSize="cover"
                                    bgPos="center"
                                />
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