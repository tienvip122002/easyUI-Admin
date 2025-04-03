import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './contexts/ThemeContext';
import Dashboard from "./pages/dashboard";
import LoginRegister from "./pages/login/LoginRegister";
import MainLayout from "./layouts/MainLayout";
import Components from './pages/Components';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="components" element={<Components />} />
            <Route path="login" element={<LoginRegister />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;