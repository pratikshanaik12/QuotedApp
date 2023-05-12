// pages/login.js

import { Box, Heading, Text } from '@chakra-ui/react'

import Link from 'next/link'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'

export default function Login() {
  return (
    <Layout hideHeader={true}>
      <Box p={4}>
        <Heading as="h1" mb={4}>Login</Heading>
        <LoginForm />
        <Box mt={4} display={'flex'}>
          Don't have an account?{'  '}
          <Text color="blue" pl={2}>
            <Link href="/signup" >Sign up</Link>
          </Text>
        </Box>
      </Box>
    </Layout>
  )
}
