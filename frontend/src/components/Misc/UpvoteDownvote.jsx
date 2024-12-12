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
            const voteCount = await fetchVoteCount(props.post.id, props.voteArea);
            setVotes(parseInt(voteCount.upvote_count));
        }

        async function getVoteState() {
            if (currentUser) {
                const accessToken = await refreshAccessToken();
                const response = await fetchVoteState(currentUser.userId, props.voteArea, props.post.id, accessToken);
                setVoteState(response ? response.vote_type: null);
            }
        }
        getVotes();
        getVoteState();
    }, []);

    async function handleVote(voteType, postId) {
        const accessToken = await refreshAccessToken();
        if (currentUser && accessToken) {
            await votePost(currentUser.userId, voteType, postId, accessToken, props.voteArea, props.communityId);
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
                w={!props.horizontalOrientation ? '45px' : null}
                icon={<TriangleUpIcon color={voteState ? "red.500" : null} />}
                borderTopRadius={props.horizontalOrientation ? null : 'full'}
                borderLeftRadius={props.horizontalOrientation ? 'full' : null}
                onClick={() => handleVote("upvote", props.post.id)}
            />
            <Box bgColor={'#3D485B'} p={2} w={!props.horizontalOrientation ? '45px': null}>
                <Text color={voteState ? "red.500" : (voteState === false ? "blue.500" : null)}>
                    {votes}
                </Text>
            </Box>
            <IconButton
                w={!props.horizontalOrientation ? '45px' : null}
                icon={<TriangleDownIcon color={voteState === false ? "blue.500" : null} />}
                borderBottomRadius={props.horizontalOrientation ? null : 'full'}
                borderRightRadius={props.horizontalOrientation ? 'full' : null}
                onClick={() => handleVote("downvote", props.post.id)}
            />
        </Box>
    )
}

export default UpvoteDownvote;