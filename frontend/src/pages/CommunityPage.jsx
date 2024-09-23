import React from 'react';
import { useCommunityStore } from '../../store/community';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Page Elements/Navbar.jsx';
import { Box } from '@chakra-ui/react';
import SideBar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
import CommunityHeader from '../components/Page Elements/CommunityHeader.jsx';
import CommunityBody from '../components/Page Elements/CommunityBody.jsx';
import { useUserStore } from '../../store/user.js';


function CommunityPage() {
	const { fetchCommunity, checkMembership } = useCommunityStore();
	const { currentUser, refreshAccessToken, joinCommunity } = useUserStore();
	const { communityId } = useParams("");

	const [community, setCommunity] = React.useState();
	const [membership, setMembership] = React.useState(false);

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
				<CommunityBody community={community} />
			</MainContent>
		</Box>
	)
}

export default CommunityPage;