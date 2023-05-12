import { Box } from '@chakra-ui/react'
import Header from './Header'

export default function Layout({ children, hideHeader }) {
  return (
    <>
      {!hideHeader && <Header />}
      <Box maxW="100%" px={4} py={8}>
        {children}
      </Box>
    </>
  )
}
