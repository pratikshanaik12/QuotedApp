import { useRouter } from 'next/router'
import { Box, Button, Flex, Heading, Spacer, useConst } from '@chakra-ui/react'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Header() {
  const router = useRouter()

  // Check if the current route is the profile page
  const isProfilePage = router.pathname === '/profile'
  const {handleLogout} = useContext(AuthContext)

  return (
    <Box bg="blue.500" color="white" p={2} py={3} px={4}>
      <Flex alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
        <Heading as="h1" size="md" mb={{ base: 2, md: 0 }} textAlign={{ base: 'center', md: 'left' }}>
          Quoted
        </Heading>
        <Spacer />
        <Box mb={{ base: 2, md: 0 }} textAlign={{ base: 'center', md: 'right' }}>
          <Link href="/">
            <Button color="teal" size="sm" mr={{ base: 2, md: 4 }} mb={{ base: 2, md: 0 }} textAlign={{ base: 'center', md: 'center'}}>
              All Quotes
            </Button>
          </Link>
          <Link href="/quotes">
            <Button color="teal" size="sm" mr={{ base: 2, md: 4 }} mb={{ base: 2, md: 0 }} textAlign={{ base: 'center', md: 'center'}}>
              Add Quotes
            </Button>
          </Link>
          {isProfilePage ? null : (
            <Link href="/profile">
              <Button color="teal" size="sm" mr={{ base: 2, md: 4 }} mb={{ base: 2, md: 0 }} textAlign={{ base: 'center', md: 'center'}}>
                Profile
              </Button>
            </Link>
          )}
          <Button colorScheme="teal" size="sm"  mr={{ base: 2, md: 4 }} mb={{ base: 2, md: 0 }} textAlign={{ base: 'center', md: 'center'}} 
            onClick={()=>handleLogout()}
          >Logout</Button>
        </Box>
      </Flex>
    </Box>
  )
}
