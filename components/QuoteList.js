import { Box } from '@chakra-ui/react'

import SingleQuote from './SingleQuote'

export default function QuoteList({quoteList}) {

  return (
    <Box>
      {quoteList?.map((quote, idx) => (
        <SingleQuote key={idx} quote={quote} />
      ))}
    </Box>
  )
}


