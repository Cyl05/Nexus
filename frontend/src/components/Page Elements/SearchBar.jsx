import { Box, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useCommunityStore } from '../../../store/community.js';
import debounce from 'lodash.debounce';
import SearchResult from '../Misc/SearchResult.jsx';

function SearchBar() {
    const [searchResults, setSearchResults] = React.useState();
    const [searchQuery, setSearchQuery] = React.useState("");

    const { search } = useCommunityStore();

    const performSearch = debounce( async (query) => {
        if (query) {
            const response = await search(query);
            setSearchResults(response.data);
        } else {
            setSearchResults();
        }
    }, 500);

    function handleChange(event) {
        const { value } = event.target;
        setSearchQuery(value);
        performSearch(value);
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
                // h={'10vh'}
                zIndex={100}
                mt={2}
                borderRadius={10}
                bgColor={'#0F131A'}
                display={searchResults ? 'block' : 'none'}
                border={'1px solid #3B3E44'}
                p={5}
            >
                {/* <SearchResult  /> */}
                {
                    searchResults &&
                    searchResults.map((result) => (<SearchResult community={result} />))
                }
                {/* { searchResults && searchResults.map((result) => (<Text>{result.name}</Text>)) } */}
            </Box>
        </Box>
    )
}

export default SearchBar;