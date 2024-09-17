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
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    body: JSON.stringify({userId: userId}),
                    "x-access-token": token
                }
            });
            const responseJSON = await response.json();
            console.log(responseJSON);
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    }
}));