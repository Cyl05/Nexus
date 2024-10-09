import { Box, Divider, Heading, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useCommunityStore } from '../../../store/community.js';

function CommunityDesc(props) {
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
        <Box w={'30%'} px={5} display={'flex'} justifyContent={'center'}>
            <Box w={'95%'} bgColor={'#0F131A'} borderRadius={10} p={5}>
                {props.postView &&
                    <HStack align={'center'} mb={5} as={'a'} href={`/community/${(props.community && props.community.id)}`}>
                        <Image
                            src={props.community && props.community.icon}
                            w={12}
                            h={12}
                            borderRadius={'full'}
                            border={'2px solid white'}
                            objectFit={'cover'}
                        />
                        <Heading size={'md'}>{props.community && props.community.name}</Heading>
                    </HStack>
                }
                
                <Heading size={'sm'}>{props.community && props.community.description_title}</Heading>
                <Text color={"gray"} my={3}>{props.community && props.community.description}</Text>
                <Divider my={3} />
                <Heading size={'sm'}>Community Size:</Heading>
                <Text color={"gray"} my={3}>{communitySize}</Text>
            </Box>
        </Box>
    )
}

export default CommunityDesc;