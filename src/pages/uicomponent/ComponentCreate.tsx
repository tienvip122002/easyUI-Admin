import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UIComponentService } from '../../services/uicomponent.service';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';

const { Option } = Select;

const StyledCard = styled(Card)`
  margin: 24px;
  .ant-card-body {
    padding: 24px;
  }
`;

const EditorContainer = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  margin-bottom: 24px;
  
  &:hover {
    border-color: #40a9ff;
  }
`;

interface ComponentFormData {
  name: string;
  code: string;
  description?: string;
  previewUrl?: string;
  type: string;
  framework: string;
  html?: string;
  css?: string;
  js?: string;
}

const ComponentCreate: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const submitData = {
        name: values.name,
        description: values.description,
        previewUrl: values.previewUrl,
        type: values.type,
        framework: values.framework,
        html: htmlCode,
        css: cssCode,
        js: jsCode
      };

      await UIComponentService.create(submitData);
      message.success('Component created successfully');
      navigate('/component');
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to create component');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledCard title="Create UI Component">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          type: 'component',
          framework: 'HTML/CSS/JS'
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input component name!' }]}
        >
          <Input placeholder="Enter component name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea 
            placeholder="Enter component description"
            rows={4}
          />
        </Form.Item>

        <Form.Item
          name="type"
          label="Type"
          rules={[{ required: true, message: 'Please select component type!' }]}
        >
          <Select>
            <Option value="component">Component</Option>
            <Option value="layout">Layout</Option>
            <Option value="page">Page</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="framework"
          label="Framework"
          rules={[{ required: true, message: 'Please select framework!' }]}
        >
          <Select>
            <Option value="HTML/CSS/JS">HTML/CSS/JS</Option>
            <Option value="React">React</Option>
            <Option value="Vue">Vue</Option>
            <Option value="Angular">Angular</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="previewUrl"
          label="Preview URL"
          rules={[{ type: 'url', message: 'Please enter a valid URL!' }]}
        >
          <Input placeholder="Enter preview URL" />
        </Form.Item>

        <Form.Item label="HTML">
          <EditorContainer>
            <Editor
              height="200px"
              defaultLanguage="html"
              theme="vs-dark"
              value={htmlCode}
              onChange={(value) => setHtmlCode(value || '')}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: 'on'
              }}
            />
          </EditorContainer>
        </Form.Item>

        <Form.Item label="CSS">
          <EditorContainer>
            <Editor
              height="200px"
              defaultLanguage="css"
              theme="vs-dark"
              value={cssCode}
              onChange={(value) => setCssCode(value || '')}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false
              }}
            />
          </EditorContainer>
        </Form.Item>

        <Form.Item label="JavaScript">
          <EditorContainer>
            <Editor
              height="200px"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={jsCode}
              onChange={(value) => setJsCode(value || '')}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false
              }}
            />
          </EditorContainer>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={loading}
            >
              Create Component
            </Button>
            <Button 
              icon={<RollbackOutlined />}
              onClick={() => navigate('/component')}
            >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </StyledCard>
  );
};

export default ComponentCreate; 