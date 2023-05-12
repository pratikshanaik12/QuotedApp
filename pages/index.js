import { useContext, useEffect } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import Layout from '../components/Layout'
import QuoteList from '../components/QuoteList'
import { AuthContext } from '../context/AuthContext'


export default function Home() {
  
  const {fetchQuotes, quoteList} = useContext(AuthContext)

  useEffect( ()=>{
   
   fetchQuotes()

  },[])
  
  return (
    <Layout>
      <Box p={4}>
        <Heading as="h1" mb={4}>All Quotes</Heading>
        <QuoteList quoteList={quoteList} />
      </Box>
    </Layout>
  )
}
