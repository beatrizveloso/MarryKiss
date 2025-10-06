import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homepage/HomePage.jsx";
import MarryKiss from "../pages/marrykiss/MarryKiss.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MarryKiss" element={<MarryKiss />} />
        <Route path="*" element={<h1>Página Não Encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
