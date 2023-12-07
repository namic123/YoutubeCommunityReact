import React, { useContext, useEffect, useRef, useState } from "react";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import { Stomp } from "@stomp/stompjs";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import { DetectLoginContext } from "../component/LoginProvider";
import { SocketContext } from "./Socket";

function Chat() {
  const { connectUser } = useContext(DetectLoginContext);
  const { stompClient, chatId, chat } = useContext(SocketContext);
  const { test } = useOutletContext();
  const [text, setText] = useState("");
  const [setIdAccess, setSetIdAccess] = useState(false);
  const [connection, setConnection] = useState(true);

  useEffect(() => {
    setSetIdAccess(true);
    chatContent();
  }, [chat]);

  const chatContent = () => {
    const chatArea = document.getElementById("chatArea");
    if (chatArea) {
      chatArea.insertAdjacentHTML(
        "beforeend",
        "<p>" + chatId + " : " + chat + "</p>",
      );
    }
  };

  // 채팅내용
  function sendMsg() {
    stompClient.current.publish({
      destination: "/app/hello",
      body: JSON.stringify({ id: connectUser, chat: text }),
    });
  }

  function disconnectSocket() {
    stompClient.current.disconnect();
    console.log("소켓통신 종료");
    console.log(stompClient.current);
    setSetIdAccess(false);
    setConnection(false);
  }

  // 채팅내용
  function handleTextInput(e) {
    setText(e.target.value);
  }

  return (
    <>
      {setIdAccess && (
        <Center>
          <Box w={"50%"} h={"500px"}>
            <Center>
              <Box
                border={"1px solid black"}
                w={"100%"}
                textAlign={"center"}
                h={"50px"}
              >
                {connectUser}님 반갑습니다.
              </Box>
            </Center>

            <Center>
              <Box
                id="chatArea"
                w={"100%"}
                border={"1px solid black"}
                textIndent={"15px"}
                h={"400px"}
              ></Box>
            </Center>

            <Center>
              <Flex w={"100%"} h={"50px"}>
                <Input value={text} onChange={handleTextInput} />
                <Button onClick={sendMsg}>입력</Button>
                <Button onClick={disconnectSocket}>종료</Button>
              </Flex>
            </Center>
          </Box>
        </Center>
      )}
    </>
  );
}

export default Chat;
