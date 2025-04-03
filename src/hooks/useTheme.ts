import { useState, useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return {
    theme: currentTheme,
    toggleTheme,
  };
}; 