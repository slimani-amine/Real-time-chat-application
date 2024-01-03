import { useState, useEffect, useRef } from "react";
import Message from "../../ui/Message";
import Contact from "../../ui/Contact";
import ChatForm from "../../ui/ChatForm";
import { useLocation } from "react-router-dom";
import { getChatRoomById } from "../../service/apiChatRooms";
import { useParams } from "react-router-dom";

export default function ChatRoom({ currentChat, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const chatData = await getChatRoomById(currentChat);
        setChat(chatData);
      } catch (error) {
        console.error("Error fetching chat room:", error.message);
      }
    };
    fetchChatRoom();
  }, []);

  return (
    <div className="lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <Contact />
        </div>

        <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <div key={index} ref={scrollRef}>
                <Message message={message} self={currentUser.uid} />
              </div>
            ))}
          </ul>
        </div>

        <ChatForm />
      </div>
    </div>
  );
}
