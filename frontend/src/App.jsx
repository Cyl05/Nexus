import React from 'react';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import PostViewPage from './pages/PostViewPage.jsx';


function App() {
  return (
    <Box minH={"100vh"}>
      {/* <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/community/:communityId" element={<CommunityPage />} />
        <Route path="/post/:postId" element={<PostViewPage />} />
      </Routes>
    </Box>
  )
}

export default App