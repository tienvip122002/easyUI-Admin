import React from 'react';
import { ConfigProvider, theme as antTheme } from 'antd';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import styled, { createGlobalStyle } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Dashboard from "./pages/Dashboard";
import LoginRegister from "./pages/login/LoginRegister";
import CategoryList from './pages/category/CategoryList';
import CategoryCreate from './pages/category/CategoryCreate';
import CategoryEdit from './pages/category/CategoryEdit';
import CategoryView from './pages/category/CategoryView';
import TagList from './pages/tag/TagList';
import TagCreate from './pages/tag/TagCreate';
import TagEdit from './pages/tag/TagEdit';
import TagView from './pages/tag/TagView';
import ComponentCreate from './pages/uicomponent/ComponentCreate';
import ComponentView from './pages/uicomponent/ComponentView';
import ComponentList from './pages/uicomponent/ComponentList';
import ComponentEdit from './pages/uicomponent/ComponentEdit';
import ComponentComments from './pages/uicomponent/ComponentComments';
import CartsPage from './pages/cart/CartsPage';
import ProfilePage from './pages/profile/ProfilePage';
import OrdersPage from './pages/orders/OrdersPage';
import AboutUsPage from './pages/aboutUs/AboutUsPage';
import ArticleList from './pages/article/ArticleList';
import ArticleCreate from './pages/article/ArticleCreate';
import ArticleEdit from './pages/article/ArticleEdit';
import ArticleView from './pages/article/ArticleView';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme === 'dark' ? '#141414' : '#f0f2f5'};
    transition: all 0.3s;
  }
`;

// Create a QueryClient instance
const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ConfigProvider theme={{
      algorithm: theme === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
      token: {
        colorPrimary: '#1890ff',
        borderRadius: 6,
      },
    }}>
      <GlobalStyle theme={theme} />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginRegister />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            </ProtectedRoute>
          }>
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
            <Route path="component/comments/:id" element={<ComponentComments />} />
            
            {/* Category Routes */}
            <Route path="category" element={<CategoryList />} />
            <Route path="category/create" element={<CategoryCreate />} />
            <Route path="category/edit/:id" element={<CategoryEdit />} />
            <Route path="category/view/:id" element={<CategoryView />} />
            
            {/* Tag Routes */}
            <Route path="tag" element={<TagList />} />
            <Route path="tag/create" element={<TagCreate />} />
            <Route path="tag/edit/:id" element={<TagEdit />} />
            <Route path="tag/view/:id" element={<TagView />} />

            {/* Cart Routes */}
            <Route path="cart" element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <CartsPage />
                </ErrorBoundary>
              </ProtectedRoute>
            } />

            <Route path="profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />

            <Route path="orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />

            <Route path="aboutUs" element={
              <ProtectedRoute>
                <AboutUsPage />
              </ProtectedRoute>
            } />

            {/* Article/Blog Routes */}
            <Route path="article" element={
              <ErrorBoundary>
                <ArticleList />
              </ErrorBoundary>
            } />
            <Route path="article/create" element={<ArticleCreate />} />
            <Route path="article/edit/:id" element={<ArticleEdit />} />
            <Route path="article/view/:id" element={<ArticleView />} />
          </Route>

          {/* Redirect to home if path doesn't match */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
