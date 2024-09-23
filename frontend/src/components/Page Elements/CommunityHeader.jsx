import { Box, Button, HStack, Image, Text, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import { FaPlus } from "react-icons/fa6";
import LeaveCommunityModal from '../Misc/LeaveCommunityModal.jsx';

function CommunityHeader(props) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box h={'40vh'}>
            {props.community &&
                (props.community.banner.includes("http")
                    ? <Image
                        position={'relative'}
                        src={props.community.banner}
                        w={'100%'}
                        h={'20vh'}
                    />
                    : <Box bgColor={props.community.banner} w={'100%'} h={'20vh'} position={'relative'} />
                )
            }

            <Image
                position={'relative'}
                top={-10}
                left={10}
                borderRadius={'full'}
                border={'5px solid #3C4B67'}
                src={props.community && props.community.icon}
                w={40}
                h={40}
            />
            <HStack
                position={'relative'}
                top={'-21vh'}
                left={'18%'}
                justify={'space-between'}
                w={'80%'}
            >
                <Text
                    color={'white'}
                    fontSize={40}
                    fontFamily={'Reddit Sans'}
                    fontWeight={'700'}

                >
                    {props.community && props.community.name}
                </Text>
                <Button leftIcon={<FaPlus />} colorScheme='teal' variant={'outline'} borderRadius={'20px'}>
                    Create
                </Button>
            </HStack>
            {props.membership
                ? <Button
                    position={'relative'}
                    top={'-21vh'}
                    left={'18%'}
                    borderRadius={'full'}
                    variant={'outline'}
                    colorScheme='white'
                    color={'white'}
                    // onClick={props.handleJoin}
                    onClick={onOpen}
                >Joined</Button>
                : <Button
                    position={'relative'}
                    top={'-21vh'}
                    left={'18%'}
                    borderRadius={'full'}
                    bgColor={'white'}
                    color={'#1A202C'}
                    onClick={props.handleJoin}
                >Join</Button>
            }
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Leave Community?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to leave {props.community && props.community.name}?
                    </ModalBody>

                    <ModalFooter>
                        <Button bgColor='red.700' mr={3} borderRadius={'full'} onClick={() => {onClose(); props.handleJoin();}}>
                            Leave
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default CommunityHeader;