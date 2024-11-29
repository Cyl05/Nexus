import { HStack, Image } from '@chakra-ui/react';
import React from 'react';
import LinkText from './LinkText';
import { useCommunityStore } from '../../../store/community.js';

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
        <HStack key={community.id} spacing={2}>
            <Image src={community.icon} w={6} h={6} display={'inline'} borderRadius={'full'} objectFit={'cover'} />
            <LinkText url={`/community/${community.id}`} text={community.name} color='white' />
        </HStack>
    )
}

export default CommunityButton;