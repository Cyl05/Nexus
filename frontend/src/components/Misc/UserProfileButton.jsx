import { Button, Icon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
import WideButton from './WideButton';
import { useUserStore } from '../../../store/user';

function UserProfileButton(props) {
    const { currentUser } = useUserStore();

    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    isRound={true}
                    variant='solid'
                    aria-label='Done'
                    fontSize='20px'
                    backgroundImage={props.user ? props.user.profile_picture : null}
                    bgSize="cover"
                    bgPos="center"
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody p={0}>
                    <WideButton
                        icon={<FaUser />}
                        width={'full'}
                        margin={0}
                        center={false}
                        href={`/user/${currentUser.userId}`}
                        name={'Profile'}
                    />
                    <WideButton
                        icon={<IoLogOut />}
                        width={'full'}
                        margin={0}
                        center={false}
                        href={`/user/${currentUser.userId}`}
                        name={'Log Out'}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>

    )
}

export default UserProfileButton;