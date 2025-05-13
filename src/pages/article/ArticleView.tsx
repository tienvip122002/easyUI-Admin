import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Divider, Typography, Tag, Space, Image, Skeleton, Descriptions, Alert, Row, Col } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import StyledCard from '../../components/common/StyledCard';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import themeConfig from '../../config/theme';
import { useArticles } from '../../hooks/useArticles';
import RelatedArticles from '../../components/article/RelatedArticles';

const { Title, Text, Paragraph } = Typography;

const ContentContainer = styled.div`
  margin-top: 24px;
`;

const ArticleContent = styled.div<{ $isDark: boolean }>`
  margin-top: 24px;
  padding: 24px;
  background-color: ${props => props.$isDark ? '#121212' : '#ffffff'};
  border-radius: 8px;
  border: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

const MetaContainer = styled.div`
  margin-bottom: 20px;
`;

const ArticleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const currentTheme = darkMode ? themeConfig.dark : themeConfig.light;
  const { article, loading, error, fetchArticleById } = useArticles();

  useEffect(() => {
    if (id) {
      fetchArticleById(id);
    }
  }, [id, fetchArticleById]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderMarkdown = (content: string): string => {
    // Simple markdown rendering (just for demonstration)
    // In a real app, you would use a library like react-markdown
    return content
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gm, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gm, '<em>$1</em>')
      .replace(/```([^`]+)```/gm, '<pre><code>$1</code></pre>');
  };

  if (loading) {
    return (
      <StyledCard title="Article">
        <Skeleton active paragraph={{ rows: 10 }} />
      </StyledCard>
    );
  }

  if (error) {
    return (
      <StyledCard title="Error">
        <Alert
          message="Error Loading Article"
          description={error}
          type="error"
          showIcon
        />
        <Button 
          type="primary" 
          onClick={() => navigate('/article')}
          style={{ marginTop: '16px' }}
        >
          Back to Articles
        </Button>
      </StyledCard>
    );
  }

  if (!article) {
    return (
      <StyledCard title="Article Not Found">
        <Paragraph>The article you're looking for doesn't exist.</Paragraph>
        <Button type="primary" onClick={() => navigate('/article')}>
          Back to Articles
        </Button>
      </StyledCard>
    );
  }

  return (
    <Row gutter={24}>
      <Col xs={24} md={16}>
        <StyledCard 
          title={
            <Space>
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate('/article')}
              >
                Back
              </Button>
              <span>Article Details</span>
            </Space>
          }
          extra={
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={() => navigate(`/article/edit/${article.id}`)}
            >
              Edit
            </Button>
          }
        >
          <HeaderContainer>
            <div>
              <Title level={2}>{article.title}</Title>
              <MetaContainer>
                <Space size={[0, 8]} wrap>
                  <Tag color="blue">{article.category}</Tag>
                  {article.tags?.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  <Tag color={article.status === 'published' ? 'green' : 'gold'}>
                    {article.status?.toUpperCase() || 'DRAFT'}
                  </Tag>
                </Space>
              </MetaContainer>
              <Text type="secondary">
                By {article.author ? article.author.fullName : 'Unknown'} 
                {article.publishedAt && (
                  <> | Published {formatDate(article.publishedAt)}</>
                )}
                {article.updatedAt && (
                  <> | Updated {formatDate(article.updatedAt)}</>
                )}
                {article.viewCount !== undefined && (
                  <> | {article.viewCount} views</>
                )}
              </Text>
            </div>
          </HeaderContainer>

          {article.featuredImage && (
            <Image 
              src={article.featuredImage} 
              alt={article.title}
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          )}

          <Divider />
          
          <Descriptions title="Article Information" bordered column={2}>
            <Descriptions.Item label="Category">{article.category}</Descriptions.Item>
            <Descriptions.Item label="Author">
              {article.author ? article.author.fullName : 'Unknown'}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={article.status === 'published' ? 'green' : 'gold'}>
                {article.status?.toUpperCase() || 'DRAFT'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">{formatDate(article.createdAt)}</Descriptions.Item>
            {article.publishedAt && (
              <Descriptions.Item label="Published At">{formatDate(article.publishedAt)}</Descriptions.Item>
            )}
            {article.updatedAt && (
              <Descriptions.Item label="Last Updated">{formatDate(article.updatedAt)}</Descriptions.Item>
            )}
            <Descriptions.Item label="Views">{article.viewCount}</Descriptions.Item>
            {article.tags && article.tags.length > 0 && (
              <Descriptions.Item label="Tags" span={2}>
                {article.tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Descriptions.Item>
            )}
          </Descriptions>

          <ContentContainer>
            <Title level={4}>Content</Title>
            <ArticleContent $isDark={darkMode}>
              {typeof article.content === 'string' && (
                <div dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }} />
              )}
            </ArticleContent>
          </ContentContainer>
        </StyledCard>
      </Col>
      <Col xs={24} md={8}>
        <RelatedArticles article={article} />
      </Col>
    </Row>
  );
};

export default ArticleView; 