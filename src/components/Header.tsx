import { Sun, Moon, Search, Bell, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Search size={20} />
        <input type="text" placeholder="Search..." className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm" />
      </div>
      <div className="flex gap-4 items-center">
        <Bell size={20} />
        <User 
          size={20} 
          className="cursor-pointer" 
          onClick={() => navigate('/login')}
        />
        <button onClick={() => setDarkMode(!darkMode)} className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;