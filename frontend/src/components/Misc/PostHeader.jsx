import { Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import dayjs from "dayjs";

function PostHeader(props) {
    return (
        <HStack align={'center'} w={'full'}>
            {!props.communityView ? <Image src={props.community.icon} w={10} h={10} borderRadius={'full'} border={'2px solid white'} objectFit={'cover'} /> : null}
            <VStack align={'flex-start'} spacing={0}>
                {!props.communityView ? <Heading
                    size={'sm'}
                    as={props.community && 'a'}
                    href={props.community && `/community/${props.community.id}`}
                    _hover={{ textDecoration: 'underline' }}
                >
                    {props.community && props.community.name}
                </Heading> : null}
                <HStack>
                    <Text color={'#808079'}>Posted by</Text>
                    <Text
                        as={props.user && 'a'}
                        href={props.user && `/user/${props.user.id}`}
                        _hover={{ textDecoration: 'underline' }}
                    >
                        { props.user && 
                            (
                                props.user.display_name.length > 10 
                                ? `${props.user.display_name.slice(0, 10)}...`
                                : props.user.display_name
                            )
                        }
                    </Text>
                    <Text display={'inline'} fontSize={13} color={'gray'}>• {dayjs(props.post.posted_at).fromNow()}</Text>
                </HStack>
            </VStack>
        </HStack>
    )
}

export default PostHeader;