import React from 'react';
import { useCommunityStore } from '../../store/community';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Page Elements/Navbar.jsx';
import { Box } from '@chakra-ui/react';
import SideBar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
import CommunityHeader from '../components/Community Page/CommunityHeader.jsx';
import CommunityBody from '../components/Community Page/CommunityBody.jsx';
import { useUserStore } from '../../store/user.js';


function CommunityPage() {
	const { fetchCommunity, checkMembership, fetchCommunityPosts } = useCommunityStore();
	const { currentUser, refreshAccessToken, joinCommunity } = useUserStore();
	const { communityId } = useParams("");

	const [community, setCommunity] = React.useState();
	const [membership, setMembership] = React.useState(false);
	const [postsList, setPostsList] = React.useState([]);

	React.useEffect(() => {
		async function getCommunity() {
			const accessToken = await refreshAccessToken();
			if (currentUser && accessToken) {
				const response = await fetchCommunity(communityId);
				setCommunity(response);
				const membershipResult = await checkMembership(currentUser.userId, communityId, accessToken);
				if (membershipResult.member) {
					setMembership(true);
				}
			}
		}

		async function getPosts() {
			const response = await fetchCommunityPosts(communityId);
			setPostsList(response);
		}
		getPosts();
		getCommunity();
	}, []);

	async function handleJoin () {
        const accessToken = await refreshAccessToken();
        if (currentUser && accessToken) {
            const response = await joinCommunity(currentUser.userId, communityId, accessToken, membership);
			setMembership(prevState => !prevState);
		}
    }

	return (
		<Box>
			<Navbar />
			<SideBar />
			<MainContent>
				<CommunityHeader community={community} membership={membership} handleJoin={handleJoin} />
				<CommunityBody community={community} posts={postsList} />
			</MainContent>
		</Box>
	)
}

export default CommunityPage;