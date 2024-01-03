import { useEffect, useState } from "react";
import SearchUsers from "../../ui/SearchUsers";
import Welcome from "../../ui/Welcome";
import Spinner from "../../ui/Spinner";
import { useUsers } from "../../hooks/useUsers";
import { useUser } from "../../hooks/useUser";
import AllUsers from "../../ui/AllUsers";
import ChatRoom from "./ChatRoom";
import { useLocation } from "react-router-dom";
import { getChatRoomBySenderId } from "../../service/apiChatRooms";
export default function ChatLayout() {
  let location = useLocation();

  const chatId = location.pathname.slice(
    location.pathname.indexOf("/") + 1,
    location.pathname.length
  );

  const [isContact, setIsContact] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, users: allUsers } = useUsers();
  const { user: currentUser } = useUser();
  useEffect(() => {
    const fetchChatRoom = async () => {
      try {
        const chatData = await getChatRoomBySenderId(currentUser.id);
        setChatRooms(chatData);
      } catch (error) {
        console.error("Error fetching chat rooms:", error.message);
      }
    };

    fetchChatRoom();
  }, []);
  const users =
    allUsers &&
    allUsers.filter((user) => {
      return user.user_id !== currentUser.id;
    });

    const usersWithoutReceiverId = users && users.filter((user) => {
      const isInChatRoom = chatRooms && chatRooms.some((room) => room.reciever_id === user.id);
      return !isInChatRoom;
    });
    

  const handleSearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
    const searchedUsers = users.filter((user) => {
      return user.fullName.toLowerCase().includes(newSearchQuery.toLowerCase());
    });
    const searchedUsersId = searchedUsers.map((u) => u.id);
    if (chatRooms.length !== 0) {
      chatRooms.forEach((chatRoom) => {
        const isUserContact = chatRoom.members.some(
          (e) => e !== currentUser.id && searchedUsersId.includes(e)
        );
        setIsContact(isUserContact);

        isUserContact
          ? setFilteredRooms([chatRoom])
          : setFilteredUsers(searchedUsers);
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
            users={searchQuery !== "" ? filteredUsers : usersWithoutReceiverId}
            chatRooms={searchQuery !== "" ? filteredRooms : chatRooms}
            setChatRooms={setChatRooms}
            // onlineUsersId={onlineUsersId}
            currentUser={currentUser}
            // changeChat={handleChatChange}
          />
        </div>
        {!chatId ? (
          <Welcome />
        ) : (
          <ChatRoom currentChat={chatId} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
}
