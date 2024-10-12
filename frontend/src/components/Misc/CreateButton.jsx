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
            <PopoverContent p={0} w={'300px'}>
                <WideButton
                    icon={<IoPeopleSharp />}
                    name={'Create a Community'}
                    href={'/create/community'}
                    margin={0}
                    width={'full'}
                    center={false}
                />
                <WideButton
                    icon={<FaPlus />}
                    name={'Create a Post'}
                    href={'/create/post'}
                    margin={0}
                    width={'full'}
                    center={false}
                />
            </PopoverContent>
        </Popover>
    )
}

export default CreateButton;