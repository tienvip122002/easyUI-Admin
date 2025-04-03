import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { useTheme } from './hooks/useTheme';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import styled, { createGlobalStyle } from 'styled-components';

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Dashboard from "./pages/Dashboard";
import LoginRegister from "./pages/login/LoginRegister";
import CategoryList from './pages/category/CategoryList';
import CategoryCreate from './pages/category/CategoryCreate';
import CategoryEdit from './pages/category/CategoryEdit';
import CategoryView from './pages/category/CategoryView';
import CommentList from './pages/comment/CommentList';
import CommentEdit from './pages/comment/CommentEdit';
import CommentView from './pages/comment/CommentView';
import TagList from './pages/tag/TagList';
import TagCreate from './pages/tag/TagCreate';
import TagEdit from './pages/tag/TagEdit';
import TagView from './pages/tag/TagView';
import ComponentCreate from './pages/uicomponent/ComponentCreate';
import ComponentView from './pages/uicomponent/ComponentView';
import ComponentList from './pages/uicomponent/ComponentList';
import ComponentEdit from './pages/uicomponent/ComponentEdit';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme === 'dark' ? '#141414' : '#f0f2f5'};
    transition: all 0.3s;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
`;

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <GlobalStyle theme={theme} />
      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginRegister />} />
            </Route>

            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              
              {/* UI Component Routes */}
              <Route path="component" element={
                <ErrorBoundary>
                  <ComponentList />
                </ErrorBoundary>
              } />
              <Route path="component/create" element={<ComponentCreate />} />
              <Route path="component/edit/:id" element={<ComponentEdit />} />
              <Route path="component/view/:id" element={<ComponentView />} />
              
              {/* Category Routes */}
              <Route path="category" element={<CategoryList />} />
              <Route path="category/create" element={<CategoryCreate />} />
              <Route path="category/edit/:id" element={<CategoryEdit />} />
              <Route path="category/view/:id" element={<CategoryView />} />
              
              {/* Comment Routes */}
              <Route path="comment" element={<CommentList />} />
              <Route path="comment/edit/:id" element={<CommentEdit />} />
              <Route path="comment/view/:id" element={<CommentView />} />
              
              {/* Tag Routes */}
              <Route path="tag" element={<TagList />} />
              <Route path="tag/create" element={<TagCreate />} />
              <Route path="tag/edit/:id" element={<TagEdit />} />
              <Route path="tag/view/:id" element={<TagView />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default App;
