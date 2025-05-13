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
import styled from 'styled-components';
import themeConfig from '../config/theme';

interface HeaderProps {
  onMenuClick: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

interface StyledHeaderProps {
  $isDark: boolean;
}

const StyledHeader = styled.header<StyledHeaderProps>`
  background-color: ${props => props.$isDark ? themeConfig.dark.cardBackground : themeConfig.light.cardBackground};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  z-index: 10;
  transition: background-color 0.2s ease-in-out;
`;

const HeaderContainer = styled.div`
  padding: 0 1rem;
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchContainer = styled.div<StyledHeaderProps>`
  flex: 1;
  padding: 0 1rem;
  display: flex;
  justify-content: start;
  max-width: 28rem;
  
  .search-input {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border-radius: 0.5rem;
    border: 1px solid ${props => props.$isDark ? themeConfig.dark.border : themeConfig.light.border};
    background-color: ${props => props.$isDark ? themeConfig.dark.cardBackground : themeConfig.light.cardBackground};
    color: ${props => props.$isDark ? themeConfig.dark.text : themeConfig.light.text};
    transition: all 0.2s ease-in-out;
    
    &:focus {
      outline: none;
      border-color: ${themeConfig.light.primary};
    }
  }
  
  .search-icon {
    height: 1.25rem;
    width: 1.25rem;
    color: ${props => props.$isDark ? themeConfig.dark.textSecondary : themeConfig.light.textSecondary};
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Header = ({ onMenuClick, onToggleSidebar, isSidebarOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);
  const currentTheme = darkMode ? themeConfig.dark : themeConfig.light;

  const handleLogout = () => {
    try {
      // Remove token from localStorage
      localStorage.removeItem('token');
      
      // Show success message
      message.success('Logged out successfully');
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      message.error('Error occurred during logout');
    }
  };

  return (
    <StyledHeader $isDark={darkMode}>
      <HeaderContainer>
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
        <SearchContainer $isDark={darkMode}>
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <MagnifyingGlassIcon className="search-icon" />
          </div>
        </SearchContainer>

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
                  style={{ 
                    backgroundColor: currentTheme.cardBackground, 
                    color: currentTheme.text,
                    borderColor: currentTheme.border
                  }}
                  className="absolute right-0 mt-2 w-40 shadow-lg rounded-md py-2 z-50"
                >
                  <a
                    onClick={() => navigate('/profile')}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    style={{ color: currentTheme.text }}
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    style={{ color: currentTheme.text }}
                  >
                    Settings
                  </a>
                  <a
                    onClick={() => navigate('/orders')}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    style={{ color: currentTheme.text }}
                  >
                    Orders
                  </a>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                    style={{ color: currentTheme.text }}
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
      </HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
