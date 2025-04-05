import React, { useEffect, useState } from 'react';
import { List, Button, Popconfirm, Typography, Input, Form, Avatar, Badge } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined, CommentOutlined } from '@ant-design/icons';
import { useComments } from '../../hooks/useComments';
import styled from 'styled-components';
import { Comment } from '../../models/comment';
import { createCommentSchema } from '../../validations/comment.schema';
import { validateSchema } from '../../utils/validation';

const { TextArea } = Input;

const CommentContainer = styled.div`
  margin: 24px;
  padding: 24px;
  background: white;
  border-radius: 8px;
`;

const ActionButton = styled(Button)`
  margin-right: 8px;
`;

const CommentButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentContent = styled.div`
  .author {
    font-weight: 500;
    margin-bottom: 4px;
  }
  .content {
    margin-bottom: 8px;
  }
  .datetime {
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }
`;

interface CommentListProps {
  componentId: string;
  initialShow?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({ componentId, initialShow = false }) => {
  const [showComments, setShowComments] = useState(initialShow);
  const {
    comments,
    loading,
    createComment,
    updateComment,
    deleteComment,
    fetchComments
  } = useComments(componentId);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [editingId, setEditingId] = React.useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = async (values: { content: string }) => {
    try {
      await validateSchema(createCommentSchema, { ...values, componentId });
      await createComment({ content: values.content, componentId });
      form.resetFields();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleUpdate = async (id: string, values: { content: string }) => {
    try {
      await updateComment(id, values);
      setEditingId(null);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const renderCommentContent = (item: Comment) => {
    if (editingId === item.id) {
      return (
        <Form
          form={editForm}
          initialValues={{ content: item.content }}
          onFinish={(values) => handleUpdate(item.id, values)}
        >
          <Form.Item name="content">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="small">
              Save
            </Button>
            <Button 
              size="small" 
              onClick={() => setEditingId(null)}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      );
    }
    return (
      <CommentContent>
        <div className="author">{item.creator?.userName || 'Unknown'}</div>
        <div className="content">{item.content}</div>
        <div className="datetime">{new Date(item.createdAt).toLocaleString()}</div>
      </CommentContent>
    );
  };

  return (
    <div>
      <CommentButton 
        icon={<CommentOutlined />}
        onClick={() => setShowComments(!showComments)}
      >
        <Badge count={comments?.length || 0}>
          Comments
        </Badge>
      </CommentButton>

      {showComments && (
        <CommentContainer>
          <Typography.Title level={4}>Comments</Typography.Title>
          
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="content">
              <TextArea rows={4} placeholder="Write a comment..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Add Comment
              </Button>
            </Form.Item>
          </Form>

          <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item: Comment) => (
              <List.Item
                actions={[
                  <ActionButton
                    key="edit"
                    icon={<EditOutlined />}
                    size="small"
                    onClick={() => setEditingId(item.id)}
                  />,
                  <Popconfirm
                    key="delete"
                    title="Are you sure you want to delete this comment?"
                    onConfirm={() => deleteComment(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <ActionButton
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                    />
                  </Popconfirm>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  description={renderCommentContent(item)}
                />
              </List.Item>
            )}
          />
        </CommentContainer>
      )}
    </div>
  );
};

export default CommentList; 