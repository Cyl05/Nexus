import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import React from 'react';
import { useUserStore } from '../../../../store/user.js';
import Post from '../../Page Elements/Post.jsx';
import Comment from '../../Post Page/Comment.jsx';

function UserTabs(props) {
    const { currentUser, getUserPosts, getUserComments, getUserSavedPosts } = useUserStore();

    const [posts, setPosts] = React.useState();
    const [comments, setComments] = React.useState();
    const [savedPosts, setSavedPosts] = React.useState();

    React.useEffect(() => {
        async function getPosts() {
            const response = await getUserPosts(props.user.id);
            setPosts(response);
        }
        getPosts();
    }, []);

    async function getComments() {
        if (!comments) {
            const response = await getUserComments(props.user.id);
            setComments(response);
        }
    }

    async function getSavedPosts() {
        const response = await getUserSavedPosts(props.user.id);
        setSavedPosts(response);
    }

    return (
        <Tabs>
            <TabList>
                <Tab>Posts</Tab>
                <Tab onClick={getComments}>Comments</Tab>
                {currentUser.userId === props.user.id ? <Tab onClick={getSavedPosts}>Saved</Tab> : null}
            </TabList>

            <TabPanels>
                <TabPanel>
                    <VStack>
                        {posts && 
                            (posts.length === 0 
                                ? <Text>No posts to display</Text>
                                : posts.map(post => {
                                    return <Post key={post.id} communityId={post.community_id} post={post} w={'full'} />
                                })
                            )
                        }
                    </VStack>
                </TabPanel>
                <TabPanel>
                    {comments && comments.map(comment => (
                        <Comment comment={comment} key={comment.id} postLink={true} />
                    ))}
                </TabPanel>
                <TabPanel>
                    <VStack>
                        {savedPosts && savedPosts.map(post => {
                            return <Post key={post.id} communityId={post.community_id} post={post} w={'full'} />
                        })}
                    </VStack>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default UserTabs;