import React, { useEffect } from 'react';
import { Card, Form, Input, Button, Typography, Space, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useTags } from '../../hooks/useTags';
import { TagService } from '../../services/tag.service';
import { UpdateTagRequest } from '../../models/tag';
import styled from 'styled-components';
import { updateTagSchema } from '../../validations/tag.schema';
import { validateSchema } from '../../utils/validation';

const { Title } = Typography;

const StyledCard = styled(Card)`
  margin: 24px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const TagEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateTag, loading } = useTags();
  const [form] = Form.useForm();
  const [initialLoading, setInitialLoading] = React.useState(true);

  useEffect(() => {
    const fetchTag = async () => {
      try {
        if (!id) {
          throw new Error('Tag ID is required');
        }
        const tagData = await TagService.getById(id);
        form.setFieldsValue(tagData);
      } catch (error) {
        console.error('Error fetching tag:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchTag();
  }, [id, form]);

  const handleSubmit = async (values: UpdateTagRequest) => {
    try {
      if (!id) {
        throw new Error('Tag ID is required');
      }
      await validateSchema(updateTagSchema, values);
      await updateTag(id, values);
      navigate('/tag');
    } catch (error: any) {
      console.error('Submit error:', error);
    }
  };

  if (initialLoading) {
    return (
      <LoadingContainer>
        <Spin size="large" />
      </LoadingContainer>
    );
  }

  return (
    <StyledCard>
      <Title level={4}>Edit Tag</Title>
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
              Update
            </Button>
            <Button onClick={() => navigate('/tag')}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </StyledCard>
  );
};

export default TagEdit; 