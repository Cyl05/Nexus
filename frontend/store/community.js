import { create } from "zustand";

export const useCommunityStore = create((set) => ({
    community: null,
    fetchCommunity: async (communityId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/community/${communityId}`);
            const responseJSON = await response.json();
            return responseJSON.data;
        } catch (error) {
            console.log(error);
        }
    }
}));