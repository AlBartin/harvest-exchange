import React from 'react'
import { useRecoilValue } from 'recoil'
import { Image, Transformation } from 'cloudinary-react'
import { usersState } from '../recoil/atoms'

// import {
//     Heading,
//     Avatar,
//     Box,
//     Center,
//     Flex,
//     Text,
//     Stack,
//     Button,
//     useColorModeValue,
//   } from '@chakra-ui/react';


function UserCard ({ user }) {

return (
//     <Center py={6}>
//     <Box
//       maxW={'270px'}
//       w={'full'}
//       bg={useColorModeValue('white', 'gray.800')}
//       boxShadow={'2xl'}
//       rounded={'md'}
//       overflow={'hidden'}>
//           <Image cloudName={'chenkhov'} publicId={user.personal_image} alt={user.username}>
//             <Transformation width="270" height="200" crop="scale" />
//         </Image>
//       <Flex justify={'center'} mt={-12}>
//         <Image cloudName={'chenkhov'} publicId={user.avatar_url} alt={user.username}>
//             <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" radius="max" width="150" crop="fill" />
//         </Image>
//       </Flex>

//       <Box p={6}>
//         <Stack spacing={0} align={'center'} mb={5}>
//           <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
//             {user.username}
//           </Heading>
//           <Text color={'gray.500'}>Currently growing: {user.crops_grown}</Text>
//         </Stack>

//         <Stack direction={'row'} justify={'center'} spacing={6}>
//           <Stack spacing={0} align={'center'}>
//             <Text fontWeight={600}>23k</Text>
//             <Text fontSize={'sm'} color={'gray.500'}>
//               Searching for:
//             </Text>
//           </Stack>
//           <Stack spacing={0} align={'center'}>
//             <Text fontWeight={600}>23k</Text>
//             <Text fontSize={'sm'} color={'gray.500'}>
//               {user.in_search_of_crops}
//             </Text>
//           </Stack>
//         </Stack>

//         <Button
//           w={'full'}
//           mt={8}
//           bg={useColorModeValue('#151f21', 'gray.900')}
//           color={'white'}
//           rounded={'md'}
//           _hover={{
//             transform: 'translateY(-2px)',
//             boxShadow: 'lg',
//           }}>
//           Follow
//         </Button>
//       </Box>
//     </Box>
//   </Center>













//**************THIS WORKS ****************** */
// return (
    <div class="card">
        <Image cloudName={'chenkhov'} publicId={user.avatar_url} alt={user.username}>
            <Transformation aspectRatio="1:1" background="#ffffff" border="0px_solid_rgb:ffffff" gravity="auto" radius="max" width="150" crop="fill" />
        </Image>
        <div className="container">
        <h2 name={user.id}> {user.username}</h2>
        <p className="title">I'm currently growing: {user.crops_grown}</p>
        <p>Searching for: {user.in_search_of_crops}</p>
        <p><button className="user-button">View Basket</button></p>
        </div>
    </div>
  ) 
}

export default UserCard