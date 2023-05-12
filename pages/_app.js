// pages/_app.js

import { ChakraProvider } from '@chakra-ui/react'
import AuthProvider from '../context/AuthContext'
// import '../src/app/page.module.css'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
      
    </ChakraProvider>
  )
}

export default MyApp
