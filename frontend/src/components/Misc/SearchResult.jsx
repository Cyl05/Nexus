import { Avatar, Box, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useCommunityStore } from '../../../store/community.js';

function SearchResult(props) {
    const { fetchCommunitySize } = useCommunityStore();

    const [communitySize, setCommunitySize] = React.useState();

    React.useEffect(() => {
        async function fetchSize() {
            console.log(props.community.id);
            const response = await fetchCommunitySize(props.community.id);
            setCommunitySize(response);
        }
        fetchSize();
    }, []);

    return (
        <Box w={'100%'} as='a' href={`/community/${props.community.id}`}>
            <HStack spacing={3}>
                <Avatar
                    src={props.community.icon}
                    w={10}
                    h={10}
                />
                <Box>
                    <Heading size={'sm'} mb={1}>{props.community.name}</Heading>
                    <Text fontSize={12}>{communitySize} members</Text>
                </Box>
            </HStack>
        </Box>
    )
}

export default SearchResult;