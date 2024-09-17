import { create } from "zustand";

export const useUserStore = create((set) => ({
    currentUser: JSON.parse(localStorage.getItem("user")),
    currentToken: JSON.parse(localStorage.getItem("token")),
    setUser: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        set((prevState) => ({...prevState, currentUser: data}));
    },
    getUserData: async (userId) => {
        const user = await fetch(`http://localhost:3000/api/user/getUser/${userId}`);
        const userJSON = await user.json();
        return userJSON.data;
    },
    fetchUser: async (token) => {
        try {
            const response = await fetch("http://localhost:3000/getSession", {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": 'application/json',
                    "x-access-token": token
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseJSON = await response.json();
            localStorage.setItem("user", JSON.stringify(responseJSON.data));
            localStorage.setItem("token", JSON.stringify(token));
            console.log(responseJSON);
            set((prevState) => ({...prevState, currentUser: responseJSON.data}));
            return responseJSON.data;
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    },
    registerUser: async(userData) => {
        const response = await fetch("http://localhost:3000/api/user/register", {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response_data = await response.json();
        return response_data;
    },
    loginUser: async(userData) => {
        const response = await fetch("http://localhost:3000/api/user/login", {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response_data = await response.json();
        return response_data;
    }
}));