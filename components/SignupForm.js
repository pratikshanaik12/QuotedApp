import { useContext, useState } from 'react'
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { AuthContext } from '../context/AuthContext'

const SignupForm =() => {
  const {handleRegister} = useContext(AuthContext)
  const [image, setImage] = useState(null)

  const handleImageChange = (event) => {
    setImage(event.target.files[0])
  }

  const [signUpObj, setSignUpObj] = useState({
    fullname: '',
    email: '',
    password: ''
  })

  const handleInput = (e)=>{
    const {name, value} = e.target
    setSignUpObj((prev)=>{
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
          <FormLabel>Full Name</FormLabel>
          <Input name ='fullname' type="text" onChange={handleInput}/>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name='email' type="email" onChange={handleInput}/>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name='password' type="password" onChange={handleInput}/>
        </FormControl>
        {}
        <Button type="submit" colorScheme="teal" w="100%" onClick={(e)=>{
          e.preventDefault()
          handleRegister(signUpObj)}}>
          Signup
        </Button>
      </Stack>
    </form>
  )
}

export default SignupForm

