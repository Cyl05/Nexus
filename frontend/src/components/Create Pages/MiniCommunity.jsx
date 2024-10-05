import { Box, Button, Center, Heading, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import { RxLoop } from "react-icons/rx";
import React from 'react';

function MiniCommunity(props) {
    const [randomColor, setRandomColor] = React.useState();

    function getRandomColor() {
        const pastelColors = [
            "#FFD1DC",
            "#B5E0CD",
            "#F2B4C9",
            "#E5C3D7",
            "#F6E3C3",
            "#B0D4B5",
            "#F4D1D8",
            "#D9E6B9",
            "#E8C8D7",
            "#B9E6D2"
        ];
        setRandomColor(pastelColors[Math.floor(Math.random() * pastelColors.length)]);
    }

    React.useEffect(() => {
        getRandomColor();
    }, []);

    return (
        <Box w={'40%'} h={'50vh'} border={'10px solid gray'} borderRadius={20} p={3} mr={0} boxShadow='dark-lg'>
            {props.image
                ? (
                    props.input.banner.length === 0
                        ? 
                        <Box w={'100%'} h={'20vh'}>
                            <Center>
                                <Heading size={'md'} mt={'6vh'}>Enter Image</Heading>
                            </Center>
                        </Box>
                        : <Image
                            position={'relative'}
                            src={props.input.banner}
                            w={'100%'}
                            h={'20vh'}
                        />
                )
                : <Box
                    bgColor={props.input.banner.length === 0 ? randomColor : props.input.banner}
                    w={'100%'}
                    h={'20vh'}
                    p={2}
                    position={'relative'}
                    display={'flex'}
                    borderTopRadius={10}
                >
                    <IconButton icon={<RxLoop />} colorScheme='teal' ml={'auto'} onClick={getRandomColor} />
                </Box>
            }
            <Image
                position={'relative'}
                top={-10}
                left={1}
                borderRadius={'full'}
                border={'5px solid #3C4B67'}
                src={props.input.icon.length === 0 ? 'https://i.postimg.cc/rsZJVfCH/unnamed.png' : props.input.icon}
                w={'40'}
                h={'40'}
            />
            <VStack
                position={'relative'}
                top={'-21vh'}
                left={'43%'}
                align={'space-between'}
                w={'80%'}
            >
                <Text
                    color={'white'}
                    // fontSize={40}
                    fontSize={30}
                    fontFamily={'Reddit Sans'}
                    fontWeight={'700'}
                >
                    {props.input.name.length === 0 ? "Enter Name" : props.input.name}
                </Text>
                <Button
                    w={'20%'}
                    borderRadius={'full'}
                    bgColor={'white'}
                    color={'#1A202C'}
                >Join</Button>
            </VStack>
        </Box>
    )
}

export default MiniCommunity;