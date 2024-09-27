import { create } from "zustand";

export const usePostStore = create((set) => ({
    fetchVoteCount: async (postId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/post/count/${postId}`);
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    },
    votePost: async (userId, voteType, postId, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/post/${voteType}/${postId}`, {
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
    fetchVoteState: async (userId, voteArea, postId, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/post/voteState/${postId}`, {
                method: 'POST',
                body: JSON.stringify({userId: userId, voteArea: voteArea}),
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
    fetchCommentNumber: async (postId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/post/commentsCount/${postId}`);
            const responseJSON = await response.json();
            return parseInt(responseJSON.data.count);
        } catch (error) {
            console.log(error);
        }
    }
}));