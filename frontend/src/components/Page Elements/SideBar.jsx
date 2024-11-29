import React, { useState } from 'react';
import { Box, Center, Divider, Flex, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import WideButton from '../Misc/WideButton';
import { FaHome, FaPlus } from "react-icons/fa";
import { useUserStore } from '../../../store/user';
import { useCommunityStore } from '../../../store/community';
import LinkText from '../Misc/LinkText';
import CommunityButton from '../Misc/CommunityButton';

function SideBar() {
	const [userCommunitiesList, setUserCommunitiesList] = useState([]);
	const [historyList, setHistoryList] = useState();

	const { currentUser, refreshAccessToken } = useUserStore();
	const { fetchUserCommunities, fetchCommunity } = useCommunityStore();

	React.useEffect(() => {
		async function fetchCommunities() {
			const accessToken = await refreshAccessToken();
			if (currentUser && accessToken) {
				const communitiesResponse = await fetchUserCommunities(currentUser.userId, accessToken);
				setUserCommunitiesList(communitiesResponse.data);
			}
		}
		const histList = JSON.parse(localStorage.getItem("history"));
		if (histList) {
			setHistoryList(histList.history);
		}
		fetchCommunities();
	}, []);


	return (
		<Box w={'20%'} h={'90vh'} pos={'fixed'} top={'10vh'} borderRight={'2px solid #3c4b67'}>
			<Center>
				<Flex direction={'column'} w={'100%'}>
					<Flex direction={'column'} w={'80%'} borderBottom={'2px solid #343E5B'} mt={4} mx={'auto'}>
						<WideButton name="Home" href="/" icon=<FaHome /> margin={3} />
						<WideButton name="Create" href="" icon=<FaPlus /> margin={3} />
					</Flex>
					<Box w={'100%'} mt={4} mx={'auto'} px={12}>
						<Flex direction={'column'} w={'100%'}>
							<Heading as={'h1'} fontSize={18} color={'#7D8BB5'}>COMMUNITIES</Heading>
							<VStack align={'flex-start'} mt={4} spacing={3}>
								{currentUser
									? userCommunitiesList.map((community) => {
										return (
											<CommunityButton communityId={community.id} />
										);
									})
									: <Text><LinkText url='/login' color='#81E6D9' text="Login" /> to view communities</Text>}
							</VStack>
						</Flex>
					</Box>
					<Divider bgColor={'#343E5B'} w={'80%'} mx={'auto'} mt={4} border={'2px solid #343E5B'} />
					<Box w={'100%'} h={'10vh'} mx={'auto'} mt={2} px={12}>
						<Heading as={'h1'} fontSize={18} color={'#7D8BB5'} my={4}>HISTORY</Heading>
						<VStack align={'flex-start'}>
							{
								historyList 
								? historyList.map((element) => (<CommunityButton communityId={element} key={element} />))
								: <Text>No history to display</Text>
							}
						</VStack>
					</Box>
				</Flex>
			</Center>
		</Box>
	)
}

export default SideBar;