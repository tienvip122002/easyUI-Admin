import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Popconfirm, Tag, message, Input, Select, Pagination, Alert } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import StyledCard from '../../components/common/StyledCard';
import styled from 'styled-components';
import { useArticles } from '../../hooks/useArticles';
import { SearchArticleRequest } from '../../models/article';

const { Option } = Select;

const SearchContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const FilterItem = styled.div`
  flex: 1;
  min-width: 200px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

const ArticleList: React.FC = () => {
  const navigate = useNavigate();
  const { 
    articles, 
    loading, 
    error,
    totalCount,
    currentPage,
    pageSize,
    totalPages,
    fetchArticles, 
    deleteArticle,
    searchArticles,
    changePage
  } = useArticles();

  // Search filters
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<'published' | 'draft' | undefined>(undefined);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleSearch = () => {
    const searchRequest: SearchArticleRequest = {
      searchTerm: searchTerm || undefined,
      category: category,
      status: status,
      pageNumber: 1,
      pageSize: 10
    };
    
    searchArticles(searchRequest);
  };

  const handleReset = () => {
    setSearchTerm('');
    setCategory(undefined);
    setStatus(undefined);
    fetchArticles(1, 10);
  };

  const handleDelete = async (id: string) => {
    const success = await deleteArticle(id);
    if (success) {
      message.success('Article deleted successfully');
    }
  };

  const handleChangePage = (page: number, pageSize?: number) => {
    changePage(page, pageSize);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 250,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: 'Author',
      key: 'author',
      width: 150,
      render: (_, record) => record.author ? record.author.fullName : 'Unknown',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={status === 'published' ? 'green' : 'gold'}>
          {status?.toUpperCase() || 'DRAFT'}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 160,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Views',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 100,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/article/view/${record.id}`)}
          />
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/article/edit/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure you want to delete this article?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const extraContent = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => navigate('/article/create')}
    >
      Add Article
    </Button>
  );

  return (
    <StyledCard title="Blog Articles" extra={extraContent}>
      <SearchContainer>
        <FilterItem>
          <Input
            placeholder="Search articles"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            suffix={<SearchOutlined />}
          />
        </FilterItem>
        <FilterItem>
          <Select 
            placeholder="Category"
            style={{ width: '100%' }}
            value={category}
            onChange={value => setCategory(value)}
            allowClear
          >
            <Option value="React">React</Option>
            <Option value="TypeScript">TypeScript</Option>
            <Option value="CSS">CSS</Option>
            <Option value="JavaScript">JavaScript</Option>
            <Option value="Node.js">Node.js</Option>
          </Select>
        </FilterItem>
        <FilterItem>
          <Select 
            placeholder="Status"
            style={{ width: '100%' }}
            value={status}
            onChange={value => setStatus(value)}
            allowClear
          >
            <Option value="published">Published</Option>
            <Option value="draft">Draft</Option>
          </Select>
        </FilterItem>
        <Space>
          <Button 
            type="primary" 
            onClick={handleSearch}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </Space>
      </SearchContainer>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}

      <Table
        columns={columns}
        dataSource={articles}
        loading={loading}
        rowKey="id"
        pagination={false}
      />

      {totalCount > 0 && (
        <PaginationContainer>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCount}
            showSizeChanger
            showQuickJumper
            showTotal={total => `Total ${total} items`}
            onChange={handleChangePage}
            onShowSizeChange={(current, size) => handleChangePage(current, size)}
          />
        </PaginationContainer>
      )}
    </StyledCard>
  );
};

export default ArticleList; 