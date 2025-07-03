import React, { useState } from "react";
import ChatScreen from "./ChatScreen";
import { ProfileIcon } from "../common/Icons";

const ChatListItem = ({ chat, onClick, isActive }) => (
  <div
    onClick={() => onClick(chat.id)}
    className={`flex items-center p-3 cursor-pointer ${
      isActive ? "bg-gray-700" : "hover:bg-gray-800"
    } border-b border-gray-800`}
  >
    <div className="w-12 h-12 rounded-full bg-gray-600 mr-4 flex-shrink-0 flex items-center justify-center">
      <ProfileIcon />
    </div>
    <div className="flex-grow">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-white">{chat.name}</h3>
        <span className="text-xs text-gray-400">{chat.time}</span>
      </div>
      <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
    </div>
  </div>
);

function AllChats() {
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "AnonymousUser1",
      lastMessage: "Sure, what's on your mind?",
      time: "10:40 AM",
    },
    {
      id: 2,
      name: "AnonymousUser2",
      lastMessage: "See you then!",
      time: "Yesterday",
    },
    {
      id: 3,
      name: "AnonymousUser3",
      lastMessage: "Thanks for the help!",
      time: "Mon",
    },
  ]);
  const [selectedChatId, setSelectedChatId] = useState(chats[0]?.id);

  const handleSelectChat = (id) => {
    setSelectedChatId(id);
  };

  const selectedChat = chats.find((c) => c.id === selectedChatId);

  return (
    <div className="flex h-full text-white bg-gray-900">
      <div className="w-96 border-r border-gray-800 flex flex-col flex-shrink-0">
        <header className="p-4 border-b border-gray-800 h-20 flex items-center">
          <h2 className="text-3xl font-bold px-4">Chats</h2>
        </header>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              onClick={handleSelectChat}
              isActive={chat.id === selectedChatId}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatScreen key={selectedChat.id} chat={selectedChat} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllChats;
