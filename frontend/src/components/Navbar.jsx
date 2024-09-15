import React from 'react';
import { Box, Button, Container, HStack, Icon, IconButton, Text } from "@chakra-ui/react";
import { CgInfinity } from "react-icons/cg";
import { useUserStore } from '../../store/user.js';
import { FaPlus } from "react-icons/fa6";

function Navbar() {
    const { currentUser } = useUserStore();


    return (
        <Container minW={"100%"} py={4} px={10} borderBottom={"2px solid #3c4b67"} boxShadow={'lg'}>
            <HStack justifyContent={"space-between"}>
                <Box>
                    <HStack>
                        <Icon as={CgInfinity} color={"#00FFFF"} boxSize={9} />
                        <Text fontSize={"xl"} fontWeight={"bold"} fontFamily={"Reddit Sans"}>Nexus</Text>
                    </HStack>
                </Box>
                <Box>
                    <HStack spacing={'10px'}>
                        <Button leftIcon={<FaPlus />} colorScheme='teal' variant={'outline'} borderRadius={'20px'}>
                            Create
                        </Button>
                        <IconButton
                            isRound={true}
                            variant='solid'
                            aria-label='Done'
                            fontSize='20px'
                            backgroundImage={currentUser ? currentUser.profile_picture : null}
                            bgSize="cover"
                            bgPos="center"
                        />
                    </HStack>
                </Box>
            </HStack>
        </Container>
    );
}

export default Navbar