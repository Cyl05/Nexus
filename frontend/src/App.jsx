import React from 'react';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CommunityPage from './pages/CommunityPage.jsx';
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";


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
      </Routes>
    </Box>
  )
}

export default App