// pages/quotes.js

import { Box, Heading } from '@chakra-ui/react'
import Header from '../components/Header'
import Layout from '../components/Layout'
import QuoteList from '../components/QuoteList'
import QuoteForm from '../components/QuoteForm'

export default function Quotes() {
  return (
    <Layout>
      <Box p={4}>
        <Heading as="h1" mb={4}>Add Quotes</Heading>
        <QuoteForm />
      </Box>
    </Layout>
  )
}
