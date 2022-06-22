import React from "react";
import { Box, Input } from "@chakra-ui/react";

const InputComp = ({ refer, disabled, onKeyDown, val, onChange }) => {
  return (
    <Box>
      <Input
        _focus={{
          outline: "none",
        }}
        border="2px solid black"
        width="50%"
        type="text"
        ref={refer}
        disabled={disabled}
        onKeyDown={onKeyDown}
        value={val}
        onChange={onChange}
      />
    </Box>
  );
};

export default InputComp;
