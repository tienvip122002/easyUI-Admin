import React from 'react';
import { Card, Typography, Descriptions, Space } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { RollbackOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import CommentList from '../../components/comment/CommentList';
import { useUIComponentEdit } from '../../hooks/useUIComponentEdit';

const { Title } = Typography;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCard = styled(Card)`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  
  .ant-card-body {
    padding: 32px;
    width: 100%;
  }
`;

const ComponentInfo = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
`;

const ComponentComments: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { component, loading } = useUIComponentEdit(id!);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <StyledCard
        title={
          <Space>
            <RollbackOutlined onClick={() => navigate('/component')} style={{ cursor: 'pointer' }} />
            <Title level={4} style={{ margin: 0 }}>Component Comments</Title>
          </Space>
        }
      >
        <ComponentInfo>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Name">{component?.name}</Descriptions.Item>
            <Descriptions.Item label="Type">{component?.type}</Descriptions.Item>
            <Descriptions.Item label="Framework">{component?.framework}</Descriptions.Item>
            <Descriptions.Item label="Price">
              {component?.price ? `$${component.price}` : 'Free'}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>
              {component?.description || 'No description'}
            </Descriptions.Item>
          </Descriptions>
        </ComponentInfo>

        {id && <CommentList componentId={id} initialShow={true} />}
      </StyledCard>
    </Container>
  );
};

export default ComponentComments; 