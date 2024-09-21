import React from 'react';
import Navbar from "../components/Page Elements/Navbar.jsx";
import { useUserStore } from '../../store/user.js';
import SideBar from '../components/Page Elements/SideBar.jsx';
import MainContent from '../components/Page Elements/MainContent.jsx';
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