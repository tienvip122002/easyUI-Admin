import React from 'react';
import { Card, Form, Input, Button, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTags } from '../../hooks/useTags';
import { CreateTagDto } from '../../models/tag';
import styled from 'styled-components';
import { createTagSchema } from '../../validations/tag.schema';
import { validateSchema } from '../../utils/validation';

const { Title } = Typography;

const StyledCard = styled(Card)`
  margin: 24px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const TagCreate: React.FC = () => {
  const navigate = useNavigate();
  const { createTag, loading } = useTags();
  const [form] = Form.useForm();

  const handleSubmit = async (values: CreateTagDto) => {
    try {
      await validateSchema(createTagSchema, values);
      await createTag(values);
      navigate('/tag');
    } catch (error: any) {
      console.error('Submit error:', error);
    }
  };

  return (
    <StyledCard>
      <Title level={4}>Create New Tag</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input tag name!' },
            { min: 2, message: 'Name must be at least 2 characters' },
            { max: 50, message: 'Name must not exceed 50 characters' }
          ]}
        >
          <Input placeholder="Enter tag name" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create
            </Button>
            <Button onClick={() => navigate('/tag')}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </StyledCard>
  );
};

export default TagCreate; 