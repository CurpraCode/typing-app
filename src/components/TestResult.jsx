import React from "react";
import { Box, Avatar, Text, Stack } from "@chakra-ui/react";

const TestResult = ({ result, badResult }) => {
  return (
    <Box>
      <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
        <Avatar
          src={"https://cdn.anime-planet.com/characters/primary/sasuke-uchiha-1-190x291.jpg?t=1625965402"}
          alt={"Author"}
        />

        <Stack direction={"column"} spacing={0} fontSize={"sm"}>
          <Text fontWeight={700}>Result</Text>
          <Text fontWeight={600}>
            Words Per Minute : <Text>{result}WPM</Text>
          </Text>
          <Text color={"gray.500"}>
            Accuracy{" "}
            {result !== 0 ? (
              <Text>{Math.round((result / (result + badResult)) * 100)}%</Text>
            ) : (
              <Text>0%</Text>
            )}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TestResult;
