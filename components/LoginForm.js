import { Button, FormControl, FormLabel, Input, Stack, useConst } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function LoginForm() {
  const {handleLogin} = useContext(AuthContext)
  const [loginObj, setLoginObj] = useState({
    email: '',
    password: ''
  })

  const handleInput = (e)=>{
    const {name, value} = e.target
    setLoginObj((prev)=>{
      return{
        ...prev,
        [name]: value
      }
    })
  }

  return (
    <form>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" name='email' onChange={handleInput}/>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" name='password' onChange={handleInput}/>
        </FormControl>
        <Button type="submit" colorScheme="teal" w="100%" onClick={(e)=>{
          e.preventDefault()
          handleLogin(loginObj)}}>Login</Button>
      </Stack>
    </form>
  )
}

