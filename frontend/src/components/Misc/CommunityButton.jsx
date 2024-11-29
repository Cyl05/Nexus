import { Box, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import LinkText from './LinkText';
import { useCommunityStore } from '../../../store/community.js';
import { useTheme } from '@emotion/react';

function CommunityButton(props) {
    const [community, setCommunity] = React.useState();

    const { fetchCommunity } = useCommunityStore();

    React.useEffect(() => {
        async function getCommunity() {
            const response = await fetchCommunity(props.communityId);
            setCommunity(response);
        }
        getCommunity();
    }, []);


    return (
        community &&
        <Box 
            w={'100%'} 
            p={2} 
            as='a'
            borderRadius={10} 
            cursor={'pointer'} 
            _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
            href={`/community/${community.id}`}
        >
            <HStack>
                <Image src={community.icon} w={6} h={6} display={'inline'} borderRadius={'full'} objectFit={'cover'} />
                <Text display={'inline'}>{community.name}</Text>
            </HStack>
        </Box>
    )
}

export default CommunityButton;