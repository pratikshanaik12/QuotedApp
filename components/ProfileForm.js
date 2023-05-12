import { getLoggedInUser, updateProfile } from '@/user'
import { Button, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProfileForm({setIsEditing}) {
  const [updateObj, setUpdateObj] = useState({}) 
  const {user, setUser} = useContext(AuthContext)
  const toast = useToast();

  useEffect(() => {
    if (!user) {
      return
    }
    setUpdateObj({
      name: user.name,
      imgData: null,
    })
  }, [user])

  const handleUpdate = async () => {
    try {
      await updateProfile(updateObj.name, updateObj.imgData, user.uid).then(async ()=>{
        const res = await getLoggedInUser()
        setUser(res)
        toast({
          title: 'Profile Uploaded!',
          status: "success",
          position: "bottom-left",
          variant: "subtle",
        });
        setIsEditing(false)
      })
      
    } catch (error) {
      console.log(error)
      toast({
        title: 'error',
        status: "error",
        position: "bottom-left",
        variant: "subtle",
      });
    }
  }

  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      handleUpdate()}}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input type="text"value={updateObj.name} onChange={(e)=>{
            setUpdateObj((prev)=>{
              return{
                ...prev,
                'name': e.target.value
              }
            })
          }}/>
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={user.email} isDisabled={true}/>
        </FormControl>
        <FormControl>
          <FormLabel>Profile Picture</FormLabel>
          <Input type="file" onChange={(e)=>{
            setUpdateObj((prev)=>{
              return{
                ...prev,
                'imgData': e.target.files[0]
              }
            })
          }}/>
        </FormControl>
        <Button type="submit" colorScheme="teal" w="full">
          Save
        </Button>
      </Stack>
    </form>
  )
}


