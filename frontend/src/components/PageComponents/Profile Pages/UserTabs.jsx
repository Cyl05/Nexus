import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import React from 'react';
import { useUserStore } from '../../../../store/user.js';
import Post from '../../Page Elements/Post.jsx';
import Comment from '../../Post Page/Comment.jsx';

function UserTabs(props) {
    const { getUserPosts, getUserComments } = useUserStore();

    const [posts, setPosts] = React.useState();
    const [comments, setComments] = React.useState();

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

    return (
        <Tabs>
            <TabList>
                <Tab>Posts</Tab>
                <Tab onClick={getComments}>Comments</Tab>
                <Tab>Saved</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <VStack>
                        {posts && posts.map(post => {
                            return <Post key={post.id} communityId={post.community_id} post={post} w={'full'} />
                        })}
                    </VStack>
                </TabPanel>
                <TabPanel>
                    {comments && comments.map(comment => (
                        <Comment comment={comment} key={comment.id} postLink={true} />
                    ))}
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default UserTabs;