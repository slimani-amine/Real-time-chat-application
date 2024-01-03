import { useState, useEffect } from "react";
import UserLayout from "../components/layouts/UserLayout";
import { getChatRoom } from "../service/apiChatRooms";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../service/apiUsers";
import { getMessageByChatRoom } from "../service/apiMessages";
import { useQuery } from "@tanstack/react-query";
import { useCreateChatRoom } from "../hooks/useCreateChatRoom";

export default function AllUsers({
  users,
  chatRooms,
  setChatRooms,
  currentUser,
}) {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [otherUsers, setOtherUsers] = useState(users);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const chatsData = await Promise.all(
          chatRooms.map(async (room) => {
            try {
              const chatData = await getUserById(room.reciever_id);
              return chatData;
            } catch (error) {
              console.error(
                `Error fetching chat data for receiverId ${room.reciever_id}:`,
                error.message
              );
              return null;
            }
          })
        );
        setChats(chatsData.flat(1));
      } catch (error) {
        console.error("Error fetching chat rooms:", error.message);
      }
    };

    fetchChatData();
  }, [chatRooms]);

  const { createChatRoom, isLoading } = useCreateChatRoom();

  async function handleOldChatRoom(user) {
    try {
      const members = {
        senderId: currentUser.id,
        receiverId: user.id,
      };
      const chatRoom = await getChatRoom(members);
      const chatRoomId = chatRoom[0].reciever_id + "";
      const messages = await getMessageByChatRoom(chatRoomId);
      
      navigate(`/${chatRoomId}`);
    } catch (error) {
      console.error("Error handling old chat room:", error.message);
    }
  }

  function handleNewChatRoom(user) {
    const members = {
      senderId: currentUser.id,
      receiverId: user.id,
    };
    createChatRoom(members);
    handleOldChatRoom(user);

    // setChats((prevChats) => [...prevChats, user]);
    // setOtherUsers((prevUsers) => prevUsers.filter((u) => user.id !== u.id));
  }

  return (
    <>
      <ul className="overflow-auto h-[30rem]">
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">Chats</h2>
        <li>
          {chats.map((user, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleOldChatRoom(user)}
            >
              <UserLayout user={user} />
              
            </div>
          ))}
        </li>
        <h2 className="my-2 mb-2 ml-2 text-gray-900 dark:text-white">
          Other Users
        </h2>
        <li>
          {otherUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-2 text-sm bg-white border-b border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleNewChatRoom(user)}
            >
              <UserLayout user={user} />
            </div>
          ))}
        </li>
      </ul>
    </>
  );
}
