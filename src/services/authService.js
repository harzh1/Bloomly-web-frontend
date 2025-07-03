const API_URL = "http://localhost:5001/api";

export async function createGuest() {
  try {
    const response = await fetch(`${API_URL}/auth/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error creating guest account:", error);
    throw error;
  }
}

export async function loginWithPhone(phone) {
  try {
    const response = await fetch(`${API_URL}/auth/phone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    return response.json();
  } catch (error) {
    console.error("Error with phone login:", error);
    throw error;
  }
}

export async function updateProfile(userId, profileData) {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    return response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
