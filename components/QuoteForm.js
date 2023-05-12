import { addQuote } from '@/quotes'
import { Button, FormControl, FormLabel, Input, Stack, Textarea, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useState } from 'react'

export default function QuoteForm() {
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

  const handleAddQuote = async (q) => {
    const { quote, authorName } = q;
    if (quote === "" || authorName === "") {
      toast({
        title: "Please enter all input",
        status: "error",
        position: "bottom-left",
        variant: "subtle",
      });
      return;
    }
    try {
      const res = await addQuote(q);
      toast({
        title: res.message,
        status: "success",
        position: "bottom-left",
        variant: "subtle",
      });
      setTimeout(() => router.push("/"), 1000)
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        position: "bottom-left",
        variant: "subtle",
      });
    }
  };
  
  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      handleAddQuote(quoteObj)}}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Quote</FormLabel>
          <Textarea resize="none" name='quote' onChange={handleInput}/>
        </FormControl>
        <FormControl>
          <FormLabel>Author Name</FormLabel>
          <Input type="text" name='authorName' onChange={handleInput}/>
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>Submit</Button>
      </Stack>
    </form>
  )
}

