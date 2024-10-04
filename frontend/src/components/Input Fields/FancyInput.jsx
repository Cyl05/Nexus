import { Box, Heading, Input, InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react';
import React from 'react';

function FancyInput(props) {
    return (
        <Box mb={3}>
            <Heading size={'md'} as={'h5'}>{props.name}</Heading>
            <InputGroup>
                {props.icon &&
                    <InputLeftElement pointerEvents='none' my={4}>
                        {props.icon}
                    </InputLeftElement>
                }

                {props.textArea
                    ? <Textarea placeholder={props.placeholder} my={4} resize={'vertical'} />
                    : <Input placeholder={props.placeholder} size='md' my={4} />
                }

            </InputGroup>
        </Box>
    )
}

export default FancyInput;