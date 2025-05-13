import React, { useEffect } from 'react';
import { List, Typography, Skeleton, Card, Tag, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useArticles } from '../../hooks/useArticles';
import styled from 'styled-components';
import { Article } from '../../models/article';

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
  padding: 12px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

interface RelatedArticlesProps {
  article: Article;
  title?: string;
  limit?: number;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ 
  article,
  title = "Related Articles",
  limit = 5
}) => {
  const navigate = useNavigate();
  const { 
    articles, 
    loading, 
    error, 
    searchArticles
  } = useArticles();

  useEffect(() => {
    if (article && article.id) {
      // Search for articles with similar tags or in the same category
      const searchRequest = {
        category: article.category,
        tags: article.tags || [],
        excludeIds: [article.id], // Exclude the current article
        pageSize: limit,
        pageNumber: 1 // Fixed property name from page to pageNumber
      };
      
      searchArticles(searchRequest);
    }
  }, [article, limit, searchArticles]);

  const handleArticleClick = (id: string) => {
    navigate(`/article/view/${id}`);
  };

  if (error) {
    return (
      <StyledCard title={title}>
        <Text type="danger">Error loading related articles: {error}</Text>
      </StyledCard>
    );
  }

  return (
    <StyledCard title={title}>
      <Skeleton loading={loading} active>
        {(!articles || articles.length === 0) ? (
          <Empty description="No related articles found" />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={articles}
            renderItem={(relatedArticle) => (
              <ArticleItem
                onClick={() => handleArticleClick(relatedArticle.id)}
                key={relatedArticle.id}
              >
                <List.Item.Meta
                  title={relatedArticle.title}
                  description={
                    <>
                      <Tag>{relatedArticle.category}</Tag>
                      <Text type="secondary" style={{ marginLeft: 8 }}>
                        By {relatedArticle.author?.fullName || 'Unknown'}
                      </Text>
                    </>
                  }
                />
              </ArticleItem>
            )}
          />
        )}
      </Skeleton>
    </StyledCard>
  );
};

export default RelatedArticles; 