import React from 'react';
import { useCommunityStore } from '../../store/community';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box } from '@chakra-ui/react';


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
			<div>{ community ? community.name : "null" }</div>
		</Box>
	)
}

export default CommunityPage;