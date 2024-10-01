import React from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    IconButton,
    Box,
    Center,
    extendTheme,
    VStack,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import WideButton from './WideButton';
import { IoPeopleSharp } from 'react-icons/io5';


function CreateButton() {
    return (
        <Popover>
            <PopoverTrigger>
                <IconButton icon={<FaPlus />} borderRadius={'full'} colorScheme='teal' />
            </PopoverTrigger>
            <PopoverContent>
                <VStack spacing={0}>
                    <WideButton icon={<IoPeopleSharp />} name={'Create a Community'} href={'/'} center={true} />
                    <WideButton icon={<FaPlus />} name={'Create a Post'} href={'/'} center={true} />
                </VStack>
            </PopoverContent>
        </Popover>
    )
}

export default CreateButton;