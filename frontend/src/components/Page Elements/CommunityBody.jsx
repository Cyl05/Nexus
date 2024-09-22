import { Box, Divider, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useCommunityStore } from '../../../store/community';

function CommunityBody(props) {
    const { fetchCommunitySize } = useCommunityStore();
    const [communitySize, setCommunitySize] = React.useState();
    React.useEffect(() => {
        async function getCommunitySize() {
            if (props.community) {
                const response = await fetchCommunitySize(props.community.id);
                setCommunitySize(response);
            }
        }
        getCommunitySize();
    }, [props.community]);

    return (
        <Box w={'100%'} h={'100vh'} >
            <HStack spacing={0}>
                <Box w={'70%'} bgColor={'yellow'}></Box>
                <Box w={'30%'} px={5} display={'flex'} justifyContent={'center'}>
                    <Box w={'95%'}  bgColor={'#0F131A'} borderRadius={10} p={5}>
                        <Heading size={'sm'}>{props.community && props.community.description_title}</Heading>
                        <Text color={"gray"} my={3}>{props.community && props.community.description}</Text>
                        <Divider my={3} />
                        <Heading size={'sm'}>Community Size:</Heading>
                        <Text color={"gray"} my={3}>{communitySize}</Text>
                    </Box>
                </Box>
            </HStack>
        </Box>
    );
}

export default CommunityBody;