import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import randomWords from "random-words";
import InputComp from "./InputComp";
import TestResult from "./TestResult";

const Container = () => {
  const time = 60;
  const numOfWord = 200;
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(time);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const textInput = useRef(null);
  const [status, setStatus] = useState("waiting");

  const generateWords = () => {
    return new Array(numOfWord).fill(null).map(() => randomWords());
  };
  useEffect(() => {
    setWords(generateWords());
  }, []);

  useEffect(() => {
    if (status === "started") {
      textInput.current.focus();
    }
  }, [status]);

  const start = () => {
    if (status === "finished") {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
    }

    if (status !== "started") {
      setStatus("started");
      let interval = setInterval(() => {
        setCountDown((prevCountdown) => {
          if (prevCountdown === 0) {
            clearInterval(interval);
            setStatus("finished");
            setCurrInput("");
            return time;
          } else {
            return prevCountdown - 1;
          }
        });
      }, 1000);
    }
  };

  const checkMatch = () => {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    // doesItMatch ? setCorrect(correct + 1) : setIncorrect(incorrect + 1)
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  };

  const handleKeyDown = ({ keyCode, key }) => {
    // space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      // backspace
    } else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  };

  const getCharClass = (wordIdx, charIdx, char) => {
    if (
      wordIdx === currWordIndex &&
      charIdx === currCharIndex &&
      currChar &&
      status !== "finished"
    ) {
      if (char === currChar) {
        return "green";
      } else {
        return "red";
      }
    } else if (
      wordIdx === currWordIndex &&
      currCharIndex >= words[currWordIndex].length
    ) {
      return "red";
    } else {
      return "";
    }
  };
  return (
    <Center py={6}>
      <Box
        maxW={"745px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          {/* inout */}
          <Text>{countDown}</Text>
          <InputComp
            refer={textInput}
            disabled={status !== "started"}
            type="text"
            onKeyDown={handleKeyDown}
            val={currInput}
            onChange={(e) => setCurrInput(e.target.value)}
          />
          <Button onClick={start}>Start</Button>
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Typing Test App
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            Type the Words below
          </Heading>
          {status === "started" && (
            <Box>
              {words.map((word, i) => (
                <Text key={i} display="inline" mr="5px">
                  {word?.split("").map((char, idx) => (
                    <Text
                      display="inline"
                      color={"gray.500"}
                      bg={getCharClass(i, idx, char)}
                      key={idx}
                    >
                      {char}
                    </Text>
                  ))}

                  {/* <Text></Text> */}
                </Text>
              ))}
            </Box>
          )}
        </Stack>
        {status === "finished" && (
          <TestResult result={correct} badResult={incorrect} />
        )}
      </Box>
    </Center>
  );
};

export default Container;
