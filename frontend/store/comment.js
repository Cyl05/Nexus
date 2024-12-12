import { create } from "zustand";

export const useCommentStore = create((set) => ({
    createComment: async (postId, commentData, token, userId, communityId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/comment/create/${postId}`, {
                method: 'POST',
                body: JSON.stringify(commentData),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            });
            const activityResponse = await fetch("http://localhost:3000/api/misc/insertActivity", {
                method: 'POST',
                body: JSON.stringify({
                    userId: userId,
                    postId: postId,
                    communityId: communityId,
                    intType: "comment"
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            });
            const activityResponseJSON = await activityResponse.json();
            console.log(activityResponseJSON);
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    },
    fetchCommentCount: async (commentId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/comment/count/${commentId}`);
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    }
}));