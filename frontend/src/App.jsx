import { Box  } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import CreatePages from "./pages/CreatePages";
import HomePage from "./pages/HomePage";
import Navbar from "./components/navbar";
import { useColorModeValue } from "@chakra-ui/react";
import { useProductStore } from "./store/product";

function App() {
  
  return (
    <Box minH={"100vh"} bg={useColorModeValue("grey.200", "gray.900")}>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePages />} />
        </Routes>
    
    </Box>
  );
}

export default App;
