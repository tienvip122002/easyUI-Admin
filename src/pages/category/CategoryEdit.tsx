import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Card, message, Space, Switch } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';
import { CategoryService } from '../../services/category.service';
import { useCategories } from '../../hooks/useCategories';
import styled from 'styled-components';

const { Option } = Select;

// Sử dụng lại các styled components từ CategoryCreate
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

const CategoryEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { categories, updateCategory } = useCategories();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await CategoryService.getById(id!);
        setInitialData(data);
        form.setFieldsValue({
          name: data.name,
          description: data.description,
          parentId: data.parentId,
          isActive: data.isActive
        });
      } catch (error) {
        message.error('Failed to fetch category');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      await updateCategory(id!, {
        name: values.name.trim(),
        description: values.description?.trim() || null,
        parentId: values.parentId || null,
        isActive: values.isActive
      });
      navigate('/category');
    } catch (error) {
      console.error('Update Error:', error);
      message.error('Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
      <MainContainer>
        <StyledCard title="Edit Category">
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
                  {categories
                    .filter(cat => cat.id !== id) // Loại bỏ category hiện tại
                    .map(category => (
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="isActive"
                label="Status"
                valuePropName="checked"
              >
                <Switch />
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
                    Update Category
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

export default CategoryEdit; 