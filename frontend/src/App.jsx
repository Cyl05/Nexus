import React from 'react';
import RegisterPage from './pages/RegisterPage.jsx';
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";


function App() {
  return (
    <Box minH={"100vh"}>
      {/* <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button> */}
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>
    </Box>
  )
}

export default App