import React, { useState } from "react";
import {
  HamburgerIcon,
  ReportIcon,
  SendIcon,
  ClockIcon,
  ProfileIcon,
} from "../common/Icons";

function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how are you?", sender: "other" },
    { id: 2, text: "I'm good, thanks! How about you?", sender: "me" },
    {
      id: 3,
      text: "Doing great! Just wanted to talk about something.",
      sender: "other",
    },
    { id: 4, text: "Sure, what's on your mind?", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      { id: Date.now(), text: newMessage, sender: "me" },
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-full text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700 h-20">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-600 mr-3 flex items-center justify-center">
            <ProfileIcon />
          </div>
          <div>
            <h2 className="font-bold">AnonymousUser</h2>
            <div className="flex items-center text-sm text-gray-400">
              <ClockIcon />
              <span className="ml-1">14:59</span>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <ReportIcon />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full ml-2">
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : ""}`}
            >
              <div
                className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                  message.sender === "me" ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <footer className="p-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 rounded-full py-2 px-4 focus:outline-none"
          />
          <button
            type="submit"
            className="ml-4 p-2 bg-blue-600 rounded-full hover:bg-blue-500"
          >
            <SendIcon />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default ChatScreen;
