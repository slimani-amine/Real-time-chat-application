import { useState, useEffect, useRef } from "react";
import Message from "../../ui/Message";
import Contact from "../../ui/Contact";
import ChatForm from "../../ui/ChatForm";
import { useCreateMessage } from "../../hooks/useCreateMessage";

export default function ChatRoom({ currentChatId, currentUser, messages,recieverId }) {
  const scrollRef = useRef();
  const { createMessage } = useCreateMessage();

  const handleFormSubmit = (message) => {    
    const newMessage = {
      sender_id: currentUser.id,
      chat_id: currentChatId,
      message,
    };
    messages.push(newMessage);
    createMessage(newMessage);
  };
  return (
    <div className="lg:col-span-2 lg:block">
      <div className="w-full">
        <div className="p-3 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <Contact recieverId={recieverId}/>
        </div>

        <div className="relative w-full p-6 overflow-y-auto h-[30rem] bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <ul className="space-y-2">
            {messages.map((message, index) => (
              <div key={index} ref={scrollRef}>
                <Message message={message} self={currentUser.id} />
              </div>
            ))}
          </ul>
        </div>

        <ChatForm handleFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}
