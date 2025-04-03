import React, { useEffect, useState } from 'react';
import { Table, Space, Button, message, Popconfirm, Card, Typography, Switch } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, PlusOutlined, BulbOutlined } from '@ant-design/icons';
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
    const token = localStorage.getItem('token');
    
    const fetchComponents = async () => {
      try {
        setLoading(true);
        console.log('Starting API call...');
        
        const data = await UIComponentService.getAll();
        console.log('API Response:', data);
        
        if (Array.isArray(data)) {
          setComponents(data);
        } else {
          console.error('Invalid response format:', data);
          message.error('Invalid data format received from server');
        }
      } catch (error: any) {
        console.error('API Error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config
        });
        
        if (error.response?.status === 500) {
          message.error('Internal server error. Please try again later.');
        } else if (error.response?.status === 401) {
          message.error('Unauthorized access. Please login again.');
          // navigate('/login');
        } else {
          message.error(error.response?.data?.message || 'Failed to fetch components');
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchComponents();
    } else {
      message.error('No authentication token found');
      // navigate('/login');
    }
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await UIComponentService.delete(id);
      message.success('Component deleted successfully');
      fetchComponents();
    } catch (error) {
      message.error('Failed to delete component');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: '25%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '20%',
    },
    {
      title: 'Framework',
      dataIndex: 'framework',
      key: 'framework',
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      width: '15%',
      render: (isActive: boolean) => (
        <span style={{ 
          color: isActive ? '#52c41a' : '#ff4d4f',
          fontWeight: 500
        }}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '20%',
      align: 'center' as const,
      render: (_: any, record: UIComponent) => (
        <Space size="middle">
          <Button 
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/component/view/${record.id}`)}
            ghost
          />
          <Button 
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/component/edit/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure to delete this component?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
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
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
          showQuickJumper: true
        }}
        scroll={{ x: 1000 }}
        bordered
      />
    </StyledCard>
  );
};

export default ComponentList; 