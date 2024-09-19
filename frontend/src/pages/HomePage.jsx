import React from 'react';
import Navbar from "../components/Navbar.jsx";
import { useUserStore } from '../../store/user.js';
import SideBar from '../components/SideBar.jsx';
import MainContent from '../components/MainContent.jsx';
import { Box } from '@chakra-ui/react';

function HomePage() {
  const { currentUser } = useUserStore();
  return (
    <Box>
      <Navbar />
      <SideBar />
      <MainContent />
    </Box>
  )
}

export default HomePage