import React, { useEffect } from 'react';
import { Table, Space, Button, Tag, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { Category } from '../../models/category';
import styled from 'styled-components';

const StyledCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const { categories, loading, fetchCategories, deleteCategory } = useCategories();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description: string) => description || 'No description',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Category) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/category/edit/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => deleteCategory(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <StyledCard>
      <HeaderContainer>
        <Title level={4}>Categories</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/category/create')}
        >
          Add Category
        </Button>
      </HeaderContainer>

      <Table
        columns={columns}
        dataSource={categories}
        loading={loading}
        rowKey="id"
      />
    </StyledCard>
  );
};

export default CategoryList; 