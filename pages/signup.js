// pages/signup.js
import { Box, Heading } from '@chakra-ui/react'
import Layout from '../components/Layout'
import SignupForm from '../components/SignupForm'

export default function Signup() {
  return (
    <Layout hideHeader={true}>
      <Box p={4}>
        <Heading as="h1" mb={4}>Signup</Heading>
        <SignupForm />
      </Box>
    </Layout>
  )
}
