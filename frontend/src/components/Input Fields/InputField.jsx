import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { FaUser } from 'react-icons/fa'

function InputField(props) {
    return (
        <InputGroup w={props.full ? 'full' : '70%'}>
            {props.icon ?
            <InputLeftElement>
                <FaUser />
            </InputLeftElement>
            : null}
            <Input
                name={props.name}
                variant={'flushed'}
                placeholder={props.placeholder}
                focusBorderColor={'teal.300'}
                onChange={props.handleChange}
                value={props.inputValue}
            />
        </InputGroup>
    )
}

export default InputField