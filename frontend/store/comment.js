import { create } from "zustand";

export const useCommentStore = create((set) => ({
    createComment: async (postId, commentData, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/comment/create/${postId}`, {
                method: 'POST',
                body: JSON.stringify(commentData),
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
    }
}));