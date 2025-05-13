import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Upload, DatePicker, Switch } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import StyledCard from '../../components/common/StyledCard';
import styled from 'styled-components';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';

const { Option } = Select;
const { TextArea } = Input;

const FormContainer = styled.div`
  max-width: 1000px;
`;

const ButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ArticleCreate: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      
      // Convert status from boolean to string
      const articleData = {
        ...values,
        status: values.status ? 'published' : 'draft',
      };
      
      await ArticleService.create(articleData);
      message.success('Article created successfully');
      navigate('/article');
    } catch (error) {
      console.error('Error creating article:', error);
      message.error('Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = [
    { value: 'React', label: 'React' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'CSS', label: 'CSS' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Node.js', label: 'Node.js' },
  ];

  const tagOptions = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'beginner', label: 'Beginner' },
  ];

  return (
    <StyledCard title="Create New Article">
      <FormContainer>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            status: false, // default to draft
            author: 'Current User',
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the article title' }]}
          >
            <Input placeholder="Enter article title" />
          </Form.Item>

          <Form.Item
            name="excerpt"
            label="Excerpt"
            rules={[{ required: true, message: 'Please enter the article excerpt' }]}
          >
            <TextArea rows={3} placeholder="Enter a short description for the article" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter the article content' }]}
          >
            <TextArea rows={10} placeholder="Enter article content" />
          </Form.Item>

          <Form.Item
            name="featuredImage"
            label="Featured Image"
          >
            <Input placeholder="Image URL" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category">
              {categoryOptions.map(option => (
                <Option key={option.value} value={option.value}>{option.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select
              mode="multiple"
              placeholder="Select tags"
              options={tagOptions}
            />
          </Form.Item>

          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please enter the author name' }]}
          >
            <Input placeholder="Enter author name" />
          </Form.Item>

          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch
              checkedChildren="Published"
              unCheckedChildren="Draft"
            />
          </Form.Item>

          <ButtonContainer>
            <Button onClick={() => navigate('/article')}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
              Save Article
            </Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </StyledCard>
  );
};

export default ArticleCreate; 