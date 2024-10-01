import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function WideButton(props) {
    const navigate = useNavigate();
    

    return (
        <Button
            leftIcon={props.icon}
            variant='ghost'
            w={'80%'}
            mb={3}
            justifyContent={props.center ? 'center' : 'flex-start'}
            fontSize={17}
            onClick={() => navigate(props.href)}
        >
            {props.name}
        </Button>
    )
}

export default WideButton;