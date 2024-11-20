import { Button } from '@chakra-ui/react';
import React from 'react';

function WideButton(props) {
    return (
        <Button
            leftIcon={props.icon}
            variant='ghost'
            w={props.width ? props.width : '80%'}
            mb={props.margin}
            justifyContent={props.center ? 'center' : 'flex-start'}
            fontSize={17}
            borderLeft={props.active ? '5px solid teal' : null}
            color={props.color}
            as={'a'}
            href={props.href}
            onClick={props.onClick}
            cursor={'pointer'}
        >
            {props.name}
        </Button>
    )
}

export default WideButton;