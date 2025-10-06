import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import HomePage from "./pages/homepage/HomePage"; 
import MarryKiss from "./pages/MarryKiss/MarryKiss";
import ScrollToTop from "./ScrollToTop";

const AppRoutes = () => { 
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MarryKiss" element={<MarryKiss />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
