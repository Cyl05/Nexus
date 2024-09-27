import { Box, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useCommunityStore } from '../../../store/community';
import Post from '../Page Elements/Post.jsx';
import { useUserStore } from '../../../store/user.js';

function CommunityBody(props) {
    const { fetchCommunitySize, fetchVoteCount, votePost } = useCommunityStore();
    const { currentUser, refreshAccessToken } = useUserStore();

    const [communitySize, setCommunitySize] = React.useState();
    const [votes, setVotes] = React.useState({});

    

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
        <Box w={'100%'}>
            <HStack spacing={0} align={'flex-start'}>
                <Box w={'70%'}>
                    <Heading size={'lg'} mx={16} my={5}>Posts</Heading>
                    <Divider ml={14} w={'90%'} bgColor={'#343E5B'} mb={5} />
                    <VStack spacing={5} w={'90%'} ml={14}>
                        {props.posts && props.posts.map( (post) => {
                            return <Post key={post.id} post={post} />;
                        })}
                    </VStack>
                </Box>
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