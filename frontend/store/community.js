import { create } from "zustand";

export const useCommunityStore = create((set) => ({
    community: null,
    fetchCommunity: async (communityId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/community/getCommunity/${communityId}`);
            const responseJSON = await response.json();
            return responseJSON.data;
        } catch (error) {
            console.log(error);
        }
    },
    fetchUserCommunities: async (userId, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/communities`, {
                method: 'POST',
                body: JSON.stringify({userId: userId}),
                headers: {
                    "Content-Type": 'application/json',
                    "x-access-token": token
                }
            });
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    }, 
    fetchCommunitySize: async (communityId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/community/getCommunitySize/${communityId}`);
            const responseJSON = await response.json();
            return responseJSON.data[0].count;
        } catch (error) {
            console.log(error);
        }
    },
    checkMembership: async (userId, communityId, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/community/checkMembership/${communityId}`, {
                method: 'POST',
                body: JSON.stringify({userId: userId}),
                headers: {
                    "Content-Type": 'application/json',
                    "x-access-token": token
                }
            });
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    },
    fetchCommunityPosts: async (communityId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/community/posts/${communityId}`);
            const responseJSON = await response.json();
            return responseJSON.data;
        } catch (error) {
            console.log(error);
        }
    },
    createCommunity: async (userId, data, token, banner) => {
        try {
            if (!data.banner) {
                data.banner = banner;
            }
            if (!data.icon) {
                data.icon = 'https://i.postimg.cc/rsZJVfCH/unnamed.png';
            }
            data.userId = userId;
            const response = await fetch(`http://localhost:3000/api/community/create`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": 'application/json',
                    "x-access-token": token
                }
            })
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    }
}));