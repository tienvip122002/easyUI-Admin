import React from 'react';
import { Card, Typography } from 'antd';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import themeConfig from '../../config/theme';

const { Title } = Typography;

interface StyledCardProps {
  $isDark: boolean;
}

const CardWrapper = styled(Card)<StyledCardProps>`
  margin: 24px;
  background-color: ${props => props.$isDark ? themeConfig.dark.cardBackground : themeConfig.light.cardBackground};
  .ant-card-body {
    padding: 24px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

interface Props {
  title: React.ReactNode;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const StyledCard: React.FC<Props> = ({ title, extra, children, className }) => {
  const { darkMode } = useTheme();
  const currentTheme = darkMode ? themeConfig.dark : themeConfig.light;

  return (
    <CardWrapper $isDark={darkMode} className={className}>
      <HeaderContainer>
        <Title level={4} style={{ color: currentTheme.text, margin: 0 }}>
          {title}
        </Title>
        {extra}
      </HeaderContainer>
      {children}
    </CardWrapper>
  );
};

export default StyledCard; 