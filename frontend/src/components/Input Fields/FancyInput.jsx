import { Box, Heading, Input, InputGroup, InputLeftElement, Textarea } from '@chakra-ui/react';
import React from 'react';

function FancyInput(props) {
    return (
        <Box mb={1}>
            <Heading size={'md'} as={'h5'}>{props.head}</Heading>
            <InputGroup>
                {props.icon &&
                    <InputLeftElement pointerEvents='none' my={4}>
                        {props.icon}
                    </InputLeftElement>
                }

                {props.textArea
                    ? <Textarea
                        name={props.name}
                        placeholder={props.placeholder}
                        my={4}
                        resize={'vertical'}
                        onChange={props.handleChange}
                        value={props.value[props.name]}
                    />

                    : <Input
                        name={props.name}
                        placeholder={props.placeholder}
                        size='md'
                        my={4}
                        onChange={props.handleChange}
                        value={props.value[props.name]}
                    />
                }

            </InputGroup>
        </Box>
    )
}

export default FancyInput;