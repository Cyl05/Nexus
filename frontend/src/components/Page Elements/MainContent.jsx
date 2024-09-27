import { Box } from '@chakra-ui/react'
import React from 'react'

function MainContent({ children }) {
	return (
		<Box ml={'20%'} mt={'10vh'} w={'80%'} h={'90vh'} p={3}>
			{children}
		</Box>
	)
}

export default MainContent