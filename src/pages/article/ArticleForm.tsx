import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Select, 
  DatePicker, 
  Switch, 
  Divider, 
  message, 
  Space, 
  Alert 
} from 'antd';
import { ArrowLeftOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import StyledCard from '../../components/common/StyledCard';
import { useArticles } from '../../hooks/useArticles';
import moment from 'moment';
import MarkdownEditor from '../../components/common/MarkdownEditor';
import ImageUpload from '../../components/common/ImageUpload';
import TagInput from '../../components/common/TagInput';

const { Option } = Select;
const { TextArea } = Input;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const FieldContainer = styled.div`
  margin-bottom: 24px;
`;

type ArticleFormMode = 'create' | 'edit';

const ArticleForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [mode, setMode] = useState<ArticleFormMode>(id ? 'edit' : 'create');
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const { 
    article, 
    loading, 
    error, 
    fetchArticleById, 
    createArticle,
    updateArticle,
    deleteArticle
  } = useArticles();

  useEffect(() => {
    if (id) {
      fetchArticleById(id);
      setMode('edit');
    } else {
      setMode('create');
    }
  }, [id, fetchArticleById]);

  useEffect(() => {
    if (article && mode === 'edit') {
      form.setFieldsValue({
        ...article,
        publishedAt: article.publishedAt ? moment(article.publishedAt) : null,
      });
    }
  }, [article, form, mode]);

  const onFinish = async (values: any) => {
    try {
      const formData = {
        ...values,
        publishedAt: values.publishedAt ? values.publishedAt.format() : null,
      };

      let result;
      if (mode === 'create') {
        result = await createArticle(formData);
        if (result) {
          message.success('Article created successfully!');
          navigate(`/article/view/${result.id}`);
        }
      } else {
        const success = await updateArticle(id!, formData);
        if (success) {
          message.success('Article updated successfully!');
          navigate(`/article/view/${id}`);
        }
      }
    } catch (error) {
      message.error(`Failed to ${mode} article`);
    }
  };

  const handleDelete = async () => {
    try {
      if (!confirmDelete) {
        setConfirmDelete(true);
        return;
      }
      
      if (id) {
        const success = await deleteArticle(id);
        if (success) {
          message.success('Article deleted successfully!');
          navigate('/article');
        }
      }
    } catch (error) {
      message.error('Failed to delete article');
    }
  };

  const handleCancel = () => {
    navigate(id ? `/article/view/${id}` : '/article');
  };

  if (loading && mode === 'edit') {
    return (
      <StyledCard title="Loading Article...">
        <div>Loading article data...</div>
      </StyledCard>
    );
  }

  if (error) {
    return (
      <StyledCard title="Error">
        <Alert
          message="Error Loading Article"
          description={error}
          type="error"
          showIcon
        />
        <Button 
          type="primary" 
          onClick={() => navigate('/article')}
          style={{ marginTop: '16px' }}
        >
          Back to Articles
        </Button>
      </StyledCard>
    );
  }

  return (
    <StyledCard
      title={
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleCancel}
          >
            Back
          </Button>
          <span>{mode === 'create' ? 'Create' : 'Edit'} Article</span>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: 'draft',
          tags: [],
          category: 'general',
        }}
      >
        <FieldContainer>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the article title' }]}
          >
            <Input placeholder="Enter article title" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select a category' }]}
          >
            <Select placeholder="Select a category">
              <Option value="technology">Technology</Option>
              <Option value="health">Health</Option>
              <Option value="finance">Finance</Option>
              <Option value="lifestyle">Lifestyle</Option>
              <Option value="education">Education</Option>
              <Option value="entertainment">Entertainment</Option>
              <Option value="sports">Sports</Option>
              <Option value="business">Business</Option>
              <Option value="science">Science</Option>
              <Option value="general">General</Option>
            </Select>
          </Form.Item>
        </FieldContainer>

        <FieldContainer>
          <Form.Item
            name="tags"
            label="Tags"
          >
            <TagInput />
          </Form.Item>
        </FieldContainer>

        <FieldContainer>
          <Form.Item
            name="featuredImage"
            label="Featured Image"
          >
            <ImageUpload />
          </Form.Item>
        </FieldContainer>

        <FieldContainer>
          <Form.Item
            name="summary"
            label="Summary"
            rules={[{ required: true, message: 'Please enter a summary' }]}
          >
            <TextArea 
              placeholder="Enter a brief summary of the article" 
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
        </FieldContainer>

        <FieldContainer>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter the article content' }]}
          >
            <MarkdownEditor />
          </Form.Item>
        </FieldContainer>

        <Divider orientation="left">Publishing Options</Divider>

        <FieldContainer>
          <Form.Item 
            name="status" 
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select placeholder="Select status">
              <Option value="draft">Draft</Option>
              <Option value="published">Published</Option>
              <Option value="archived">Archived</Option>
            </Select>
          </Form.Item>
        </FieldContainer>

        <FieldContainer>
          <Form.Item 
            name="publishedAt" 
            label="Publication Date"
          >
            <DatePicker 
              showTime 
              format="YYYY-MM-DD HH:mm:ss" 
              placeholder="Select publication date and time"
            />
          </Form.Item>
        </FieldContainer>

        <ButtonsContainer>
          <Space>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
            >
              {mode === 'create' ? 'Create' : 'Update'} Article
            </Button>
          </Space>

          {mode === 'edit' && (
            <Button 
              danger 
              type={confirmDelete ? "primary" : "default"}
              icon={<DeleteOutlined />} 
              onClick={handleDelete}
            >
              {confirmDelete ? 'Confirm Delete' : 'Delete Article'}
            </Button>
          )}
        </ButtonsContainer>
      </Form>
    </StyledCard>
  );
};

export default ArticleForm; 