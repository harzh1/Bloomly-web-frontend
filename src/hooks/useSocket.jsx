import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocket(userId) {
  const [isConnected, setIsConnected] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [peer, setPeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    // Connect to socket server
    const socket = io("http://localhost:5001");
    socketRef.current = socket;

    // Set up event listeners
    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("register", userId);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      setPeer(null);
      setIsWaiting(false);
    });

    socket.on("waiting", () => {
      setIsWaiting(true);
    });

    socket.on("chatStart", ({ peerInfo }) => {
      setIsWaiting(false);
      setPeer(peerInfo);
      setMessages([]);
    });

    socket.on("receiveMessage", ({ message }) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("peerDisconnected", () => {
      setPeer(null);
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // Function to find a new peer
  const findPeer = () => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit("findPeer");
    }
  };

  // Function to send a message
  const sendMessage = (text) => {
    if (socketRef.current && peer) {
      socketRef.current.emit("sendMessage", { message: text });
      // Optimistically add message to UI
      const newMessage = {
        _id: Date.now().toString(),
        sender: userId,
        text,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  return {
    isConnected,
    isWaiting,
    peer,
    messages,
    findPeer,
    sendMessage,
  };
}
