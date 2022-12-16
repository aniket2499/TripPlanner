import io from "socket.io-client";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../firebase/Auth";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";

const socket = io.connect("http://localhost:3002");

const Chat = ({ socket, id }) => {
  const currUser = useContext(AuthContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  socket.on("fromApi", function (data) {
    console.log("123");
    data.map((x) => {
      const usernameMessage = x.split(":");
      const redisUsername = usernameMessage[0];
      const redisMessage = usernameMessage[1];
      const newObj = {
        room: id,
        author: redisUsername,
        message: redisMessage,
      };
      setMessageList((list) => [...list, newObj]);
    });
  });
  console.log(messageList);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      // console.log(currentMessage);
      const messageData = {
        room: id,
        author: currUser._delegate.displayName,
        message: currentMessage,
      };
      await socket.emit("send_message", messageData);
      // console.log("Inside Chat");
      // await socket.emit("FROMAPI", (messageData) => {
      //   console.log(messageData, "====");
      // });
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    console.log("Here");
    socket.on("receive_message", (data) => {
      console.log(data, "==");
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={
                  currUser._delegate.displayName === messageContent.author
                    ? "you"
                    : "other"
                }
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
