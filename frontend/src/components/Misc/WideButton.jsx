import { Button, Icon, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function WideButton(props) {
    const navigate = useNavigate();
    

    return (
        <Button
            leftIcon={props.icon}
            variant='ghost'
            w={props.width ? props.width : '80%'}
            mb={props.margin}
            justifyContent={props.center ? 'center' : 'flex-start'}
            fontSize={17}
            borderLeft={props.active ? '5px solid teal' : '5px solid #1A202C'}
            color={props.color}
            as={'a'}
            href={props.href}
        >
            {props.name}
        </Button>
    )
}

export default WideButton;