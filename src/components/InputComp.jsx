import React from 'react'
import {Box, Input} from "@chakra-ui/react"

const InputComp = ({refer,disabled, onKeyDown, val, onChange}) => {
  return (
    <Box>
        <Input
        type="text"
        ref={refer}
        disabled={disabled}
        onKeyDown={onKeyDown}
        value={val}
        onChange={onChange}
        />
    </Box>
  )
}

export default InputComp