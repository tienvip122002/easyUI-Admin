import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Upload, DatePicker, Switch } from 'antd';
import { UploadOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
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

const ArticleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [article, setArticle] = useState<Article | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setFetchLoading(true);
        if (id) {
          const data = await ArticleService.getById(id);
          if (data) {
            setArticle(data);
            form.setFieldsValue({
              ...data,
              status: data.status === 'published', // Convert to boolean for Switch component
            });
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        message.error('Failed to fetch article');
      } finally {
        setFetchLoading(false);
      }
    };
    
    fetchArticle();
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      
      // Process the values
      const updatedArticle = {
        ...values,
        status: values.status ? 'published' : 'draft',
        updatedAt: new Date().toISOString(),
      };
      
      if (id) {
        await ArticleService.update(id, updatedArticle);
        message.success('Article updated successfully');
        navigate('/article');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      message.error('Failed to update article');
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
    { value: 'javascript', label: 'JavaScript' },
  ];

  if (fetchLoading) {
    return <StyledCard title="Loading Article..."></StyledCard>;
  }

  return (
    <StyledCard 
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/article')}
          >
            Back
          </Button>
          <span>Edit Article</span>
        </div>
      }
    >
      <FormContainer>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
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
            {article?.featuredImage && (
              <div style={{ marginTop: '8px' }}>
                <img 
                  src={article.featuredImage} 
                  alt="Featured" 
                  style={{ 
                    maxWidth: '200px', 
                    maxHeight: '100px', 
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }} 
                />
              </div>
            )}
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
              Update Article
            </Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </StyledCard>
  );
};

export default ArticleEdit; 