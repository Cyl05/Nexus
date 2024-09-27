import React from 'react';
import { useUserStore } from '../../../store/user.js';
import { usePostStore } from '../../../store/post.js';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

function UpvoteDownvote(props) {
    const { fetchVoteCount, votePost, fetchVoteState } = usePostStore();
    const { currentUser, refreshAccessToken } = useUserStore();
    
    const [votes, setVotes] = React.useState();
    const [voteState, setVoteState] = React.useState();

    React.useEffect(() => {
        async function getVotes() {
            const voteCount = await fetchVoteCount(props.post.id);
            setVotes(parseInt(voteCount.upvote_count));
        }

        async function getVoteState() {
            const accessToken = await refreshAccessToken();
            const response = await fetchVoteState(currentUser.userId, "post", props.post.id, accessToken);
            setVoteState(response ? response.vote_type: null);
        }
        getVotes();
        getVoteState();
    }, []);

    async function handleVote(voteType, postId) {
        const accessToken = await refreshAccessToken();
        if (currentUser && accessToken) {
            await votePost(currentUser.userId, voteType, postId, accessToken);
            if (voteType === "upvote") {
                if (voteState) {
                    setVotes(prevState => prevState - 1);
                } else if (voteState === false) {
                    setVotes(prevState => prevState + 2);
                } else {
                    setVotes(prevState => prevState + 1);
                }
                setVoteState(prevState => (prevState ? null : true));
            } else {
                if (voteState === false) {
                    setVotes(prevState => prevState + 1);
                } else if (voteState === true) {
                    setVotes(prevState => prevState - 2);
                } else {
                    setVotes(prevState => prevState - 1);
                }
                setVoteState(prevState => (prevState === false ? null : false));
            }
        }
    }
    

    return (
        <Box display={'flex'} flexDirection={props.horizontalOrientation ? 'row' : 'column'}>
            <IconButton
                icon={<TriangleUpIcon color={voteState ? "red.500" : null} />}
                borderTopRadius={props.horizontalOrientation ? null : 'full'}
                borderLeftRadius={props.horizontalOrientation ? 'full' : null}
                minW={'full'}
                onClick={() => handleVote("upvote", props.post.id)}
            />
            <Box bgColor={'#3D485B'} w={'full'} p={2}><Text color={voteState ? "red.500" : (voteState === false ? "blue.500" : null)}>{votes}</Text></Box>
            <IconButton
                icon={<TriangleDownIcon color={voteState === false ? "blue.500" : null} />}
                borderBottomRadius={props.horizontalOrientation ? null : 'full'}
                borderRightRadius={props.horizontalOrientation ? 'full' : null}
                minW={'full'}
                onClick={() => handleVote("downvote", props.post.id)}
            />
        </Box>
    )
}

export default UpvoteDownvote;