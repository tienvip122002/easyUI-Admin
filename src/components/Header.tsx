import {
  MagnifyingGlassIcon,
  BellIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { message } from 'antd';

interface HeaderProps {
  onMenuClick: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ onMenuClick, onToggleSidebar, isSidebarOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    try {
      // Xóa token khỏi localStorage
      localStorage.removeItem('token');
      
      // Hiển thị thông báo thành công
      message.success('Đăng xuất thành công');
      
      // Chuyển hướng về trang login
      navigate('/login');
    } catch (error) {
      message.error('Có lỗi xảy ra khi đăng xuất');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-10 transition-colors duration-200">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Menu buttons */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isSidebarOpen ? (
              <ChevronLeftIcon className="h-6 w-6" />
            ) : (
              <ChevronRightIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 px-4 flex justify-start max-w-md">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                focus:outline-none focus:border-blue-500 dark:focus:border-blue-400
                transition-colors duration-200"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center space-x-2 sm:space-x-4 relative">
          {/* Bell icon */}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
            <BellIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>

          {/* User dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
              <UserIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2 z-50"
                >
                  <a
                    onClick={() => navigate('/profile')}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Settings
                  </a>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                  >
                    Logout
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
