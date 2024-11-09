import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import React from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

function PasswordField(props) {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <InputGroup w={props.full ? 'full' : '70%'}>
            {props.icon ? 
            <InputLeftElement>
                <FaLock />
            </InputLeftElement>
            : null}
            <Input
                name={props.name}
                variant={props.variant}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder={props.placeholder}
                focusBorderColor={'teal.300'}
                onChange={props.handleChange}
                value={props.inputValue}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? <FaEyeSlash /> : <FaEye />}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default PasswordField