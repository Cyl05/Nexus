import { create } from "zustand";

export const usePostStore = create((set) => ({
    fetchPost: async (postId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/post/view/${postId}`);
            const responseJSON = await response.json();
            return responseJSON.data;
        } catch (error) {
            console.log(error);
        }
    },
    fetchVoteCount: async (postId, voteArea) => {
        try {
            const response = await fetch(`http://localhost:3000/api/${voteArea}/count/${postId}`);
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    },
    votePost: async (userId, voteType, postId, token, voteArea, communityId) => {
        console.log(communityId);
        try {
            const response = await fetch(`http://localhost:3000/api/${voteArea}/${voteType}/${postId}`, {
                method: 'POST',
                body: JSON.stringify({userId: userId}),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            });
            if (voteType === "upvote") {
                const activityResponse = await fetch(`http://localhost:3000/api/misc/insertActivity`, {
                    method: 'POST',
                    body: JSON.stringify({
                        userId: userId,
                        postId: postId,
                        communityId: communityId,
                        intType: "upvote"
                    }), 
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                });
                const activityResponseJSON = await activityResponse.json();
                console.log(activityResponseJSON);
                return activityResponseJSON;
            }
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    },
    fetchVoteState: async (userId, voteArea, postId, token) => {
        try {
            const response = await fetch(`http://localhost:3000/api/${voteArea}/voteState/${postId}`, {
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
    },
    fetchPostComments: async (postId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/comment/list/${postId}`);
            const responseJSON = await response.json();
            return (responseJSON);
        } catch (error) {
            console.log(error);
        }
    },
    createPost: async (userId, token, data, communityId) => {
        try {
            data.userId = userId;
            data.communityId = communityId;
            const response = await fetch(`http://localhost:3000/api/post/create`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            })
            const responseJSON = await response.json();
            return responseJSON;
        } catch (error) {
            console.log(error);
        }
    },
    savePostStatus: async (postId, userId) => {
        if (!userId) {
            return false;
        }
        try {
            const response = await fetch(`http://localhost:3000/api/user/savestatus/${postId}/${userId}`);
            const responseJSON = await response.json();
            return responseJSON.data;
        } catch (error) {
            console.log(error);
        }
    }
}));