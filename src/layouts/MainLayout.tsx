import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useTheme } from '../contexts/ThemeContext';
import themeConfig from '../config/theme';
import styled from 'styled-components';

interface MainContainerProps {
  $isDark: boolean;
}

const MainContainer = styled.div<MainContainerProps>`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: ${props => props.$isDark ? themeConfig.dark.background : themeConfig.light.background};
  transition: background-color 0.2s ease-in-out;
`;

const SidebarContainer = styled.div<{ $isOpen: boolean; $isMobileOpen: boolean; $isDark: boolean }>`
  position: fixed;
  @media (min-width: 1024px) {
    position: relative;
    display: flex;
  }
  
  width: ${props => props.$isOpen ? '16rem' : '5rem'};
  transform: ${props => props.$isMobileOpen ? 'translateX(0)' : 'translateX(-100%)'};
  @media (min-width: 1024px) {
    transform: translateX(0);
  }
  
  height: 100%;
  background-color: ${props => themeConfig.light.sidebar};
  transition: all 0.3s ease-in-out;
  z-index: 30;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const MainContent = styled.main<MainContainerProps>`
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${props => props.$isDark ? themeConfig.dark.background : themeConfig.light.background};
  transition: background-color 0.2s ease-in-out;
`;

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { darkMode } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <MainContainer $isDark={darkMode}>
      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <SidebarContainer 
        $isOpen={sidebarOpen} 
        $isMobileOpen={isMobileSidebarOpen}
        $isDark={darkMode}
      >
        <Sidebar isCollapsed={!sidebarOpen} />
      </SidebarContainer>

      {/* Main Content */}
      <ContentContainer>
        <Header 
          onMenuClick={toggleMobileSidebar}
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={sidebarOpen}
        />
        <MainContent $isDark={darkMode}>
          <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </MainContent>
      </ContentContainer>
    </MainContainer>
  );
};

export default MainLayout;