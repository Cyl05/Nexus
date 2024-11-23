import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useUserStore } from '../../../store/user.js';

function SearchBar() {
    const [searchResults, setSearchResults] = React.useState();

    const { search } = useUserStore();

    function handleChange(event) {
        if (event.target.value == 'x') {
            // search
        }
    }

    return (
        <Box w={'30%'}>
            <InputGroup boxShadow={'2xl'}>
                <InputLeftElement>
                    <FaSearch />
                </InputLeftElement>
                <Input
                    focusBorderColor='teal.400'
                    borderRadius={'full'}
                    bgColor={'#0F131A'}
                    onChange={handleChange}
                />
            </InputGroup>
            <Box
                w={'100%'}
                h={'10vh'}
                zIndex={100}
                mt={2}
                borderRadius={10}
                bgColor={'#161C27'}
                display={searchResults ? 'block' : 'none'}>
            </Box>
        </Box>
    )
}

export default SearchBar;