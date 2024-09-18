import React from 'react';
import Navbar from "../components/Navbar.jsx";
import { useUserStore } from '../../store/user.js';

function HomePage() {
  const { currentUser } = useUserStore();
  return (
    <Navbar />
  )
}

export default HomePage