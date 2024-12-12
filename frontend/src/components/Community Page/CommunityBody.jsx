import { Box, Divider, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useCommunityStore } from '../../../store/community';
import Post from '../Page Elements/Post.jsx';
import { useUserStore } from '../../../store/user.js';
import CommunityDesc from './CommunityDesc.jsx';

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
        props.community &&
        <Box w={'100%'}>
            <HStack spacing={0} align={'flex-start'}>
                <Box w={'70%'}>
                    <Heading size={'lg'} mx={16} my={5}>Posts</Heading>
                    <Divider ml={14} w={'90%'} bgColor={'#343E5B'} mb={5} />
                    <VStack spacing={5} w={'90%'} ml={14}>
                        {props.posts && props.posts.map( (post) => {
                            return <Post key={post.id} post={post} community={props.community} communityView={true} communityId={props.community.id} />;
                        })}
                    </VStack>
                </Box>
                <CommunityDesc community={props.community} />
            </HStack>
        </Box>
    );
}

export default CommunityBody;