import React, { useEffect } from 'react';
import { Table, Space, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTags } from '../../hooks/useTags';
import { Tag } from '../../models/tag';
import StyledCard from '../../components/common/StyledCard';

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

  const extraContent = (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => navigate('/tag/create')}
    >
      Add Tag
    </Button>
  );

  return (
    <StyledCard title="Tags" extra={extraContent}>
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