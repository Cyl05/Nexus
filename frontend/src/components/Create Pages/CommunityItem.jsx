import { Box, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';

function CommunityItem(props) {
    return (
        <HStack>
            <Image src={props.icon} w={6} h={6} borderRadius={'full'} display={'inline'} />
            <Text display={'inline'}>{props.name}</Text>
        </HStack>
    )
}

export default CommunityItem;