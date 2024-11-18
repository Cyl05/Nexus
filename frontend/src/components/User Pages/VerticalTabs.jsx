import { Box } from '@chakra-ui/react';
import React from 'react';
import WideButton from '../Misc/WideButton';
import { FaEdit, FaUser } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';

function VerticalTabs(props) {
    return (
        <Box w={'30%'} mt={5}>
            <WideButton
                icon={<FaUser />}
                name={'Profile'}
                width={'full'}
                margin={1}
                href={`/user/${props.userId}`}
                active={props.active == 1 ? true : false}
            />
            <WideButton
                icon={<FaEdit />}
                name={'Edit Profile'}
                width={'full'}
                margin={1}
                href={`/user/${props.userId}/edit`}
                active={props.active == 2 ? true : false}
            />
            <WideButton
                icon={<FaShield />}
                name={'Security'}
                width={'full'}
                margin={1}
                href={`/user/${props.userId}/security`}
                active={props.active == 3 ? true : false}
            />
            <WideButton
                icon={<IoLogOut />}
                name={'Log Out'}
                color={'red.500'}
                width={'full'}
                margin={1}
                active={props.active == 4 ? true : false}
            />
        </Box>
    )
}

export default VerticalTabs;