import { useEffect, useState } from "react";
import SearchUsers from "../../ui/SearchUsers";
import Welcome from "../../ui/Welcome";
import Spinner from "../../ui/Spinner";
import { useUsers } from "../../hooks/useUsers";
import { useUser } from "../../hooks/useUser";
import AllUsers from "../../ui/AllUsers";
import ChatRoom from "./ChatRoom";
import { useLocation } from "react-router-dom";
import {
  getChatRoomByRecievrId,
  getChatRoomBySenderId,
} from "../../service/apiChatRooms";
export default function ChatLayout() {
  let location = useLocation();

  const chatId = location.pathname.split("/")[1];

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, users: allUsers } = useUsers();
  const { user: currentUser } = useUser();
  const [recieverId, setRecieverId] = useState();
  const handleMessages = (messages) => {
    setMessages(messages);
  };
  const handleRecieverId = (id) => {
    setRecieverId(id);
  };
  const users =
    allUsers &&
    allUsers.filter((user) => {
      return user.user_id !== currentUser.id;
    });

  //chatrooms of the current user
  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        console.log(currentUser.id);
        const data = await getChatRoomBySenderId(currentUser.id);
        const data2 = await getChatRoomByRecievrId(currentUser.id);

        setRecieverId(data2?.reciever_id || data?.reciever_id);
        const chatRooms = data.length ? data : data2.length ? data2 : [];
        const chatData =
          chatRooms &&
          chatRooms.filter((room) => {
            return (
              room.reciever_id === currentUser.id ||
              room.sender_id === currentUser.id
            );
          });
        setChatRooms(chatData);
      } catch (error) {
        console.error("Error fetching chat rooms:", error.message);
      }
    };
    fetchChatRoom();
  }, []);
  console.log(users, chatRooms);
  const usersWithoutReceiverId =
    (users &&
      users.filter((user) => {
        const isInChatRoom =
          chatRooms &&
          chatRooms.some((room) => {
            return (
              room.reciever_id === user.user_id ||
              room.sender_id === user.user_id
            );
          });
        return !isInChatRoom;
      })) ||
    [];
  console.log(usersWithoutReceiverId);
  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
    console.log(allUsers, "allUsers");
    const searchedUsers = allUsers.filter((user) => {
      return user.fullName.toLowerCase().includes(newSearchQuery.toLowerCase());
    });
    const searchedUsersId = searchedUsers.map((u) => u.id);
    console.log(searchedUsersId, "searchedUsersId");

    if (chatRooms.length !== 0) {
      chatRooms.forEach((chatRoom) => {
        const usersWithoutReceiverId =
          searchedUsers &&
          searchedUsers.filter((user) => {
            const isInChatRoom =
              chatRooms &&
              chatRooms.some((room) => room.reciever_id === user.id);
            return isInChatRoom;
          });
        console.log(usersWithoutReceiverId);
        setFilteredRooms(usersWithoutReceiverId);
      });
    } else {
      setFilteredUsers(searchedUsers);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="container mx-auto">
      <div className="min-w-full bg-white border-x border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 rounded lg:grid lg:grid-cols-3">
        <div className="bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700 lg:col-span-1">
          <SearchUsers handleSearch={handleSearch} />
          <AllUsers
            users={
              searchQuery !== "" ? filteredUsers : usersWithoutReceiverId || []
            }
            chatRooms={searchQuery !== "" ? filteredRooms : chatRooms || []}
            currentUser={currentUser}
            handleMessages={handleMessages}
            handleRecieverId={handleRecieverId}
          />
        </div>
        {!chatId ? (
          <Welcome />
        ) : (
          <ChatRoom
            currentChatId={chatId}
            currentUser={currentUser}
            messages={messages}
            recieverId={recieverId}
          />
        )}
      </div>
    </div>
  );
}
