const API_URL = "http://localhost:5001/api";

export async function getUserChats(userId) {
  try {
    const response = await fetch(`${API_URL}/chats/${userId}`);
    return response.json();
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
}
