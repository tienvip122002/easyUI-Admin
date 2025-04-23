import React, { useEffect, useState } from 'react';
import { Table, Space, Button, message, Popconfirm, Card, Typography, Switch, Tag, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined, BulbOutlined, CommentOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { UIComponent } from '../../models/uicomponent';
import { UIComponentService } from '../../services/uicomponent.service';
import { useTheme } from '../../hooks/useTheme';
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

const ActionContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ComponentList: React.FC = () => {
  const [components, setComponents] = useState<UIComponent[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchComponents();
  }, []);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      const data = await UIComponentService.getAll();
      console.log('Fetched components:', data);
      setComponents(data);
    } catch (error) {
      console.error('Error fetching components:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await UIComponentService.delete(id);
      message.success('Component deleted successfully');
      fetchComponents();
    } catch (error) {
      console.error('Error deleting component:', error);
      message.error('Failed to delete component');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 50,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      render: (description: string) => (
        <div style={{ 
          maxHeight: '100px',
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '5px',
          wordBreak: 'break-word',
          border: '1px solid #333',
          borderRadius: '4px',
          backgroundColor: '#333', 
          color: '#fff',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          {description || 'No description'}
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 10,
      render: (price: number | null) => 
        price ? `$${price.toFixed(2)}` : 'Free',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      width: 10,
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 10,
      render: (_: any, record: UIComponent) => (
        <Space>
          <Button 
            icon={<EyeOutlined />}
            onClick={() => navigate(`/component/view/${record.id}`)}
          />
          <Button 
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/component/edit/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure you want to delete this component?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
          <Button
            icon={<CommentOutlined />}
            onClick={() => navigate(`/component/comments/${record.id}`)}
          />
        </Space>
      ),
    },
  ];

  return (
    <StyledCard>
      <HeaderContainer>
        <Title level={4} style={{ margin: 0 }}>UI Components</Title>
        <ActionContainer>
          <Space>
            <Switch
              checkedChildren={<BulbOutlined />}
              unCheckedChildren={<BulbOutlined />}
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => navigate('/component/create')}
            >
              Add New Component
            </Button>
          </Space>
        </ActionContainer>
      </HeaderContainer>

      <Table 
        columns={columns} 
        dataSource={components}
        rowKey="id"
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`
        }}
        scroll={{ x: 1200 }}
        bordered
      />
    </StyledCard>
  );
};

export default ComponentList; 