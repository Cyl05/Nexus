import { Link, Text } from '@chakra-ui/react';
import React from 'react';

function LinkText(props) {
  return (
    <Link href={`http://localhost:5173${props.url}`} display={'inline'}>
        <Text color={props.color} display={'inline'}>{props.text}</Text>
    </Link>
  )
}

export default LinkText;