import { create } from "zustand";

export const useUserStore = create((set) => ({
    currentUser: JSON.parse(localStorage.getItem("user")),
    accessToken: JSON.parse(localStorage.getItem("accessToken")),
    refreshToken: JSON.parse(localStorage.getItem("refreshToken")),
    setUser: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        set((prevState) => ({...prevState, currentUser: data}));
    },
    getUserData: async (userId) => {
        const user = await fetch(`http://localhost:3000/api/user/getUser/${userId}`);
        const userJSON = await user.json();
        return userJSON.data;
    },
    fetchUser: async (accessToken, refreshToken) => {
        try {
            const response = await fetch("http://localhost:3000/getSession", {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({'accessToken': accessToken}),
                headers: {
                    "Content-Type": 'application/json',
                    "x-access-token": accessToken
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseJSON = await response.json();
            localStorage.setItem("user", JSON.stringify(responseJSON));
            localStorage.setItem("accessToken", JSON.stringify({accessToken: accessToken}));
            localStorage.setItem("refreshToken", JSON.stringify({refreshToken: refreshToken}));
            set((prevState) => ({...prevState, currentUser: responseJSON}));
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
    },
    refreshAccessToken: async () => {
        let refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
            const response = await fetch('http://localhost:3000/api/user/refreshToken', {
                method: 'POST',
                body: JSON.stringify(refreshToken),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseJSON = await response.json();
            localStorage.setItem('accessToken', JSON.stringify({accessToken: responseJSON.accessToken}));
            return responseJSON.accessToken;
        }
    },
    joinCommunity: async (userId, communityId, token, membership) => {
        const action = membership ? "leave" : "join";
        try {
            const response = await fetch(`http://localhost:3000/api/user/${action}/${communityId}`, {
                method: 'POST',
                body: JSON.stringify({userId: userId}),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            });
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    },
    getUserPosts: async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/posts/${userId}`);
            const responseJSON = await response.json();
            return responseJSON.data;
        } catch (error) {
            console.log(error);
        }
    },
    getUserComments: async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/comments/${userId}`);
            const responseJSON = await response.json();
            return responseJSON.data;
        } catch (error) {
            console.log(error);
        }
    },
    getUserSavedPosts: async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/savedposts/${userId}`);
            const responseJSON = await response.json();
            return responseJSON.data;
        } catch (error) {
            console.log(error);
        }
    },
    savePost: async (postId, userId, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/save/${postId}`, {
                method: 'POST',
                body: JSON.stringify({userId: userId}),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            });
            const responseJSON = await response.json();
            return responseJSON.data;
        } catch (error) {
            console.log(error);
        }
    },
    editUser: async (userId, user, token) => {
        console.log(user);
        try {
            const response = await fetch(`http://localhost:3000/api/user/edit/${userId}`, {
                method: 'POST',
                body: JSON.stringify({user: user}),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            });
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    },
    changePassword: async (userId, input, token) => {
        const response = await fetch(`http://localhost:3000/api/user/changepassword/${userId}`, {
            method: 'POST',
            body: JSON.stringify({data: input}),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
        const responseJSON = await response.json();
        return responseJSON;
    },
    deleteAccount: async (userId, currentUserId, token) => {
        const response = await fetch(`http://localhost:3000/api/user/delete/${userId}`, {
            method: 'POST',
            body: JSON.stringify({currentUserId: currentUserId}),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });
        const responseJSON = await response.json();
        return responseJSON;
    },
    logoutUser: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    },
    fetchTopCommunities: async (userId) => {
        const response = await fetch(`http://localhost:3000/api/user/topCommunities/${userId}`);
        const responseJSON = await response.json();
        return responseJSON;
    }
}));