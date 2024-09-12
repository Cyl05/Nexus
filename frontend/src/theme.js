import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config

// 3. extend the theme
const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
});

export default theme