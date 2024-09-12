import { create } from "zustand";

export const useUserStore = create((set) => ({
    currentUser: [],
    fetchUser: async () => {
        const response = await fetch("http://localhost:3000/getSession");
        const user = await response.json();
        return user
    },
    registerUser: async(userData) => {
        console.log(userData);
        const response = await fetch("http://localhost:3000/user/register", {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response_data = await response.json();
        return response_data;
    }
    // registerUser: async (userData) => {
    //     console.log('UserData:', userData);
      
    //     try {
    //       const response = await fetch("http://localhost:3000/user/register", {
    //         method: 'POST',
    //         body: JSON.stringify(userData),
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }
    //       });
      
    //       console.log('Response status:', response.status);
    //       console.log('Response ok:', response.ok);
      
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
      
    //       const response_data = await response.json();
    //       console.log('Response data:', response_data);
    //       return response_data;
    //     } catch (error) {
    //       console.error('Error in registerUser:', error);
    //       throw error; // Re-throw the error for the calling function to handle
    //     }
    // }
}));