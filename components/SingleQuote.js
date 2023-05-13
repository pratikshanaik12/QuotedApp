import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, Button, ButtonGroup, Flex, FormControl, FormLabel, HStack, IconButton, Image, Input, Text, Textarea, VStack, useToast } from '@chakra-ui/react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'next/router'
import {EditIcon, DeleteIcon, CloseIcon, CheckIcon} from '@chakra-ui/icons'
import { deleteQuote, editQuote } from '@/quotes'

const SingleQuote = ({quote}) => {
    const {user, fetchQuotes} = useContext(AuthContext)
    const [isEditing, setIsEditing] = useState(false)
    const [quoteObj, setQuoteobj] = useState({
      quote:'',
      authorName:''
    })
  
    const toast = useToast();
    const router = useRouter();
  
    const handleInput = (e)=>{
      const {name, value} = e.target
      setQuoteobj((prev)=>{
        return{
          ...prev,
          [name]: value
        }
      })
    }
    

    useEffect(() => {
      if (!user) {
        return
      }
      if (quote.userID !== user.uid) return
      setQuoteobj({
        quoteId: quote.quoteId,
        quote: quote.quote,
        authorName: quote.authorName
      })
    }, [user, quote])
    

    const handleOnSave = async () => {
      const {quoteId, quote, authorName} = quoteObj
      try {
        const res = await editQuote(quoteId, user.uid, quote, authorName);
        toast({
          title: 'Quote updated successfully',
          status: "success",
          position: "bottom-left",
          variant: "subtle",
        });
        fetchQuotes()
        setIsEditing(false)
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

    const handleOnDelete = async () => {
      const {quoteId} = quoteObj
      try {
        await deleteQuote(quoteId, user.uid).then(()=>{
          toast({
            title: 'Quote deleted successfully',
            status: "success",
            position: "bottom-left",
            variant: "subtle",
          });
          fetchQuotes()
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
    isEditing === false ? (
        <Flex key={quote.id} bg="gray.100" p={4} mb={4} flexDirection={['column', 'row']} alignItems={['center', 'flex-start']}>
          {quote.profileURL ? (
            <Image src={quote.profileURL} alt={quote.authorName} mr={[0, 4]} mb={[4, 0]} borderRadius="full" boxSize={[100, 150]} />
          ) : (
            <Avatar size='xl' />
          )}
          <HStack w={'100%'} justifyContent={'space-between'} gap={2}>
          <Box w={'100%'}>
            <Text fontSize={['md', 'lg']} fontWeight="bold">{quote.quote}</Text>
            <Text fontSize={['sm', 'md']}>{quote.authorName}</Text>
            <Text fontSize={['sm', 'md']}>{new Date(quote.timeStamp).toDateString()}</Text>
          </Box>
          {user && quote.userID === user.uid?  (
            <VStack>
              <IconButton colorScheme='blue' icon={<EditIcon />} onClick={()=>{setIsEditing(true)}}/>
              <IconButton colorScheme='red' icon={<DeleteIcon />} onClick={()=>{ handleOnDelete()}}/>
            </VStack>
             
          ):(<></>)}
          </HStack>

        </Flex>
    ):(
        <Flex key={quote.id} bg="gray.100" p={4} mb={4} flexDirection={['column', 'row']} alignItems={['center', 'flex-start']}>
        {quote.profileURL ? (
          <Image src={quote.profileURL} alt={quote.authorName} mr={[0, 4]} mb={[4, 0]} borderRadius="full" boxSize={[100, 150]} />
        ) : (
          <Avatar size='xl' />
        )}
        <VStack w={'100%'}>
        <FormControl>
          <FormLabel>Quote</FormLabel>
          <Textarea value={quoteObj.quote} type='text' resize="none" name='quote' onChange={handleInput}/>
        </FormControl>
        <FormControl>
          <FormLabel>Author Name</FormLabel>
          <Input value={quoteObj.authorName} type="text" name='authorName' onChange={handleInput}/>
        </FormControl>
          
          <>
          {user && quote.userID === user.uid? (
          <HStack >
            <IconButton colorScheme='blue' icon={<CheckIcon />} onClick={() => { setIsEditing(false)
              handleOnSave()
            }}/>
              <IconButton colorScheme='red' icon={<CloseIcon />} onClick={()=>{setIsEditing(!isEditing)}}/>
                          
                           </HStack>
          
        ):(<></>)}
          </>
        </VStack>
        
        
      </Flex>
    )
    
  )
}

export default SingleQuote






















