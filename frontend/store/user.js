import { create } from "zustand";

export const useUserStore = create((set) => ({
    currentUser: JSON.parse(localStorage.getItem('user')),
    setUser: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        set({currentUser: data});
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
            // set({currentUser: responseJSON.data});
            const user = await fetch(`http://localhost:3000/user/${responseJSON.data.id}`);
            const userJSON = await user.json();
            set({currentUser: userJSON.data});
            return userJSON.data;
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    },
    registerUser: async(userData) => {
        const response = await fetch("http://localhost:3000/user/register", {
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
        const response = await fetch("http://localhost:3000/user/login", {
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