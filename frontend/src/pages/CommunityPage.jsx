import React from 'react';
import { useCommunityStore } from '../../store/community';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Page Elements/Navbar.jsx';
import { Box } from '@chakra-ui/react';
import SideBar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';


function CommunityPage() {
	const { fetchCommunity } = useCommunityStore();
	const { communityId } = useParams("");
	
	const [community, setCommunity] = React.useState();

	React.useEffect(() => {
		async function getCommunity() {
			const response = await fetchCommunity(communityId);
			setCommunity(response);
		}
		getCommunity();
	}, []);
	
	return (
		<Box>
			<Navbar />
			<SideBar />
			<MainContent>
				<Box color={'white'}>{ community ? community.name : "null" }</Box>
			</MainContent>
		</Box>
	)
}

export default CommunityPage;