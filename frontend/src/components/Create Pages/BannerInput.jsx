import { Box, Heading, HStack, Input, InputGroup, InputLeftElement, Radio, RadioGroup, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import React from 'react';
import { MdFormatPaint } from 'react-icons/md';

function BannerInput(props) {
    return (
        <Box my={4}>
            <Heading size={'md'} as={'h5'}>Banner</Heading>
            <RadioGroup my={3} onChange={props.setValue} value={props.radioValue}>
                <Stack direction='row'>
                    <Radio value='1'>Color Code</Radio> 
                    <Radio value='2'>Image</Radio>
                </Stack>
            </RadioGroup>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <MdFormatPaint />
                </InputLeftElement>
                <Input
                    name={props.name}
                    placeholder={props.radioValue === '1' ? 'Enter Hex Code' : "Enter Banner URL"}
                    size='md'
                    maxLength={props.radioValue === '1' ? 7 : null}
                    onChange={props.handleChange}
                    value={props.value[props.name]}
                />
            </InputGroup>
        </Box>
    )
}

export default BannerInput;