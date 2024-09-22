import React, { useState } from 'react';
import { Box, Center, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import WideButton from '../Misc/WideButton';
import { FaHome, FaPlus } from "react-icons/fa";
import { useUserStore } from '../../../store/user';
import { useCommunityStore } from '../../../store/community';
import LinkText from '../Misc/LinkText';

function SideBar() {
	const [communitiesList, setCommunitiesList] = useState([]);
	const { currentUser, refreshToken } = useUserStore();
	const { fetchUserCommunities } = useCommunityStore();

	React.useEffect(() => {
		async function fetchCommunities() {
			const accessToken = await refreshToken();
			if (currentUser && accessToken) {
				const communitiesResponse = await fetchUserCommunities(currentUser.userId, accessToken);
				setCommunitiesList(communitiesResponse.data);
			}
		}
		fetchCommunities();
	}, []);


	return (
		<Box w={'20%'} h={'90vh'} pos={'fixed'} top={'10vh'} borderRight={'2px solid #3c4b67'}>
			<Center>
				<Flex direction={'column'} w={'100%'}>
					<Flex direction={'column'} w={'80%'} borderBottom={'2px solid #343E5B'} mt={4} mx={'auto'}>
						<WideButton name="Home" href="/" icon=<FaHome /> />
						<WideButton name="Create" href="" icon=<FaPlus /> />
					</Flex>
					<Box w={'100%'} mt={4} mx={'auto'} px={12}>
						<Flex direction={'column'} w={'100%'}>
							<Heading as={'h1'} fontSize={18} color={'#7D8BB5'}>COMMUNITIES</Heading>
							<VStack spacing={1} align={'flex-start'} mt={4}>
								{currentUser
									? communitiesList.map((community) => {
										return <LinkText key={community.id} url={`/community/${community.id}`} text={community.name} color='white' />;
									})
									: <Text><LinkText url='/login' color='#81E6D9' text="Login" /> to view communities</Text>}
							</VStack>
						</Flex>
					</Box>
				</Flex>
			</Center>
		</Box>
	)
}

export default SideBar;