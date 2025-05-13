import React, { useEffect } from 'react';
import { List, Avatar, Space, Typography, Skeleton, Card, Tag, Pagination, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, CalendarOutlined } from '@ant-design/icons';
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const IconText = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

interface ArticlesByAuthorProps {
  authorId: string;
  title?: string;
  pageSize?: number;
}

const ArticlesByAuthor: React.FC<ArticlesByAuthorProps> = ({ 
  authorId,
  title = "Author's Articles",
  pageSize = 10
}) => {
  const navigate = useNavigate();
  const { 
    articles, 
    loading, 
    error, 
    totalCount,
    currentPage,
    totalPages,
    fetchArticlesByAuthor,
    changePage
  } = useArticles();

  useEffect(() => {
    fetchArticlesByAuthor(authorId, 1, pageSize);
  }, [authorId, pageSize, fetchArticlesByAuthor]);

  const handleArticleClick = (id: string) => {
    navigate(`/article/view/${id}`);
  };

  const handlePageChange = (page: number) => {
    changePage(page);
    fetchArticlesByAuthor(authorId, page, pageSize);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (error) {
    return (
      <StyledCard title={title}>
        <Text type="danger">Error loading articles: {error}</Text>
      </StyledCard>
    );
  }

  return (
    <StyledCard title={title}>
      <Skeleton loading={loading} active>
        {articles.length === 0 ? (
          <Empty description="No articles found for this author" />
        ) : (
          <>
            <List
              itemLayout="vertical"
              dataSource={articles}
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
                    title={<Title level={5}>{article.title}</Title>}
                    description={
                      <Space>
                        <Tag>{article.category}</Tag>
                        {article.tags?.map(tag => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </Space>
                    }
                  />
                  {article.summary}
                </ArticleItem>
              )}
            />
            
            {totalCount > 0 && (
              <PaginationContainer>
                <Pagination 
                  current={currentPage} 
                  total={totalCount}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </PaginationContainer>
            )}
          </>
        )}
      </Skeleton>
    </StyledCard>
  );
};

export default ArticlesByAuthor; 