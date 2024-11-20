import { Button, Icon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import React from 'react';
import { FaUser } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
import WideButton from './WideButton';
import { useUserStore } from '../../../store/user';
import { useNavigate } from 'react-router-dom';

function UserProfileButton(props) {
    const { currentUser, logoutUser } = useUserStore();
    const navigate = useNavigate();

    function handleClick () {
        logoutUser();
        navigate("/");
    }

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
                    border={'2px solid #A0AEC0'}
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                    <WideButton
                        icon={<FaUser />}
                        width={'full'}
                        margin={1}
                        center={false}
                        href={`/user/${currentUser.userId}`}
                        name={'Profile'}
                    />
                    <WideButton
                        icon={<IoLogOut />}
                        width={'full'}
                        margin={0}
                        center={false}
                        name={'Log Out'}
                        color={'red.500'}
                        onClick={handleClick}
                    />
                </PopoverBody>
            </PopoverContent>
        </Popover>

    )
}

export default UserProfileButton;