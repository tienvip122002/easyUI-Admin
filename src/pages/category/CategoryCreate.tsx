import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';
import { useCategories } from '../../hooks/useCategories';
import styled from 'styled-components';

const { Option } = Select;

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f0f2f5;
  padding: 24px;
`;

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  width: 100%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  .ant-card-head {
    padding: 0 24px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .ant-card-body {
    padding: 24px;
  }
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CategoryCreate: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { categories, createCategory } = useCategories();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await createCategory({
        name: values.name.trim(),
        description: values.description?.trim() || null,
        parentId: values.parentId || null
      });
      navigate('/category');
    } catch (error) {
      console.error('Create Error:', error);
      message.error('Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <MainContainer>
        <StyledCard title="Create Category">
          <FormContainer>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: 'Please input category name!' },
                  { min: 2, message: 'Name must be at least 2 characters' },
                  { max: 100, message: 'Name must not exceed 100 characters' }
                ]}
              >
                <Input size="large" placeholder="Enter category name" />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { max: 500, message: 'Description must not exceed 500 characters' }
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter category description"
                />
              </Form.Item>

              <Form.Item
                name="parentId"
                label="Parent Category"
              >
                <Select
                  size="large"
                  placeholder="Select parent category"
                  allowClear
                >
                  {categories.map(category => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item>
                <Space style={{ float: 'right' }}>
                  <Button
                    icon={<RollbackOutlined />}
                    onClick={() => navigate('/category')}
                    size="large"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SaveOutlined />}
                    loading={loading}
                    size="large"
                  >
                    Create Category
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </FormContainer>
        </StyledCard>
      </MainContainer>
    </PageWrapper>
  );
};

export default CategoryCreate; 