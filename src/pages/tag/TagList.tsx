import React, { useEffect } from 'react';
import { Table, Space, Button, Popconfirm, Card, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTags } from '../../hooks/useTags';
import { Tag } from '../../models/tag';
import styled from 'styled-components';

const { Title } = Typography;

const StyledCard = styled(Card)`
  margin: 24px;
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

const TagList: React.FC = () => {
  const navigate = useNavigate();
  const { tags, loading, fetchTags, deleteTag } = useTags();

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: Tag) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/tag/edit/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure you want to delete this tag?"
            onConfirm={() => deleteTag(record.id)}
            okText="Yes"
            cancelText="No"
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
        <Title level={4}>Tags</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/tag/create')}
        >
          Add Tag
        </Button>
      </HeaderContainer>

      <Table
        columns={columns}
        dataSource={tags}
        loading={loading}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`
        }}
      />
    </StyledCard>
  );
};

export default TagList;