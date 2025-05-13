import React, { useEffect } from 'react';
import { List, Avatar, Space, Typography, Skeleton, Card, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MessageOutlined, LikeOutlined, EyeOutlined, CalendarOutlined } from '@ant-design/icons';
import { useArticles } from '../../hooks/useArticles';
import styled from 'styled-components';

const { Text, Title } = Typography;

const StyledCard = styled(Card)`
  margin-bottom: 24px;
  .ant-card-head-title {
    padding: 16px 0;
  }
`;

const ArticleItem = styled(List.Item)`
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const IconText = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

interface LatestArticlesProps {
  limit?: number;
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ limit = 5 }) => {
  const navigate = useNavigate();
  const { latestArticles, loading, error, fetchLatestArticles } = useArticles();

  useEffect(() => {
    fetchLatestArticles(limit);
  }, [limit, fetchLatestArticles]);

  const handleArticleClick = (id: string) => {
    navigate(`/article/view/${id}`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (error) {
    return (
      <StyledCard title="Latest Articles">
        <Text type="danger">Error loading articles: {error}</Text>
      </StyledCard>
    );
  }

  return (
    <StyledCard title="Latest Articles">
      <Skeleton loading={loading} active>
        <List
          itemLayout="vertical"
          dataSource={latestArticles}
          renderItem={(article) => (
            <ArticleItem
              onClick={() => handleArticleClick(article.id)}
              key={article.id}
              actions={[
                <IconText 
                  icon={<CalendarOutlined />} 
                  text={formatDate(article.publishedAt || article.createdAt)} 
                  key="date" 
                />,
                <IconText 
                  icon={<EyeOutlined />} 
                  text={article.viewCount?.toString() || '0'} 
                  key="views" 
                />,
                article.status === 'published' ? (
                  <Tag color="green">PUBLISHED</Tag>
                ) : (
                  <Tag color="gold">{article.status?.toUpperCase() || 'DRAFT'}</Tag>
                )
              ]}
              extra={
                article.featuredImage && (
                  <img
                    width={120}
                    alt={article.title}
                    src={article.featuredImage}
                  />
                )
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={article.author?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author?.fullName || 'Unknown')}`} />
                }
                title={<Title level={5}>{article.title}</Title>}
                description={
                  <Space>
                    <Text type="secondary">By {article.author?.fullName || 'Unknown'}</Text>
                    <Tag>{article.category}</Tag>
                  </Space>
                }
              />
              {article.summary}
            </ArticleItem>
          )}
        />
      </Skeleton>
    </StyledCard>
  );
};

export default LatestArticles; 