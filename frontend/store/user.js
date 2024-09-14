import { create } from "zustand";

export const useUserStore = create((set) => ({
    currentUser: [],
    fetchUser: async () => {
        const response = await fetch("http://localhost:3000/getSession", {
            method: 'GET',
            credentials: 'include'
        });
        const user = await response.json();
        console.log(user);
        return user;
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