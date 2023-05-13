// pages/signup.js
import { Box, Heading, Text } from '@chakra-ui/react'
import Layout from '../components/Layout'
import SignupForm from '../components/SignupForm'
import Link from 'next/link'

export default function Signup() {
  return (
    <Layout hideHeader={true}>
      <Box p={4}>
        <Heading as="h1" mb={4}>Signup</Heading>
        <SignupForm />
        <Box mt={4} display={'flex'}>
          Want to login?
          <Text color="blue" pl={2}>
            <Link href="/login" >Click here</Link>
          </Text>
        </Box>
      </Box>
    </Layout>
  )
}
