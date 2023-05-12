// pages/profile.js

import { Box, Button, HStack, Heading, IconButton, Text, Stack, StackDivider, Card, CardHeader, CardBody, CardFooter, Image, Avatar } from '@chakra-ui/react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import ProfileForm from '../components/ProfileForm'
import { useContext, useState } from 'react'
import {BiEdit} from 'react-icons/bi'
import {GiCancel} from 'react-icons/gi'
import { AuthContext } from '../context/AuthContext'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const {user} = useContext(AuthContext)
  // console.log(user)
  return (
    <Layout >
      
      {user && (
        <Box p={4}>
        <HStack justifyContent={'space-between'}>
        <Heading as="h1" mb={4}>{isEditing && 'Edit'} Profile</Heading>
        <IconButton icon={isEditing === true ? <span><GiCancel /></span> :  <span><BiEdit /></span>} onClick={() => { setIsEditing(!isEditing) }} />

        </HStack>
        
        {isEditing === true ? (
          <ProfileForm setIsEditing={setIsEditing} />
        ):(
          <Card>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      {user.profileURL === ''?(
        <Avatar size='xl' />
      ):(
        <Image src={user.profileURL} mr={[0, 4]} mb={[4, 0]} borderRadius="full" boxSize={[100, 150]} />
      )}
    
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Full Name
        </Heading>
        <Text pt='2' fontSize='sm'>
          {user.name}
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Email Id
        </Heading>
        <Text pt='2' fontSize='sm'>
          {user.email}
        </Text>
      </Box>
      <Box>
    
      </Box>
    </Stack>
  </CardBody>
</Card>
        )}
      </Box>
      )}
      
    </Layout>
  )
}
