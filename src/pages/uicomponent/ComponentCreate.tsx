import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UIComponentService } from '../../services/uicomponent.service';
import Editor from '@monaco-editor/react';
import styled from 'styled-components';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';

const { Option } = Select;

const StyledCard = styled(Card)`
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  
  .ant-card-body {
    padding: 32px;
    width: 100%;
  }
`;

const FormFieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EditorContainer = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-bottom: 24px;
  overflow: hidden;
  width: 100%;
  &:hover {
    border-color: #40a9ff;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditorItem = styled(Form.Item)`
  width: 100%;
  
  .ant-form-item-control-input,
  .ant-form-item-control-input-content {
    width: 100%;
  }
`;

const DescriptionItem = styled(Form.Item)`
  width: 100%;
  
  .ant-form-item-control-input,
  .ant-form-item-control-input-content,
  .ant-input {
    width: 100%;
  }
`;

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
      if (!values.name?.trim()) {
        message.error('Name is required');
        return;
      }

      const submitData = {
        name: values.name.trim(),
        description: values.description?.trim() || null,
        html: htmlCode?.trim() || null,
        css: cssCode?.trim() || null,
        js: jsCode?.trim() || null,
        previewUrl: values.previewUrl?.trim() || null,
        type: values.type.trim(),
        framework: values.framework.trim(),
        price: values.price ? Number(values.price) : null,
        discountPrice: values.discountPrice ? Number(values.discountPrice) : null
      };

      if (!submitData.type || !submitData.framework) {
        message.error('Type and Framework are required');
        return;
      }

      await UIComponentService.create(submitData);
      message.success('Component created successfully');
      navigate('/component');
    } catch (error: any) {
      console.error('Create Error:', error);
      message.error(error.response?.data?.message || 'Failed to create component');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <StyledCard title="Create UI Component">
        <Form
          form={form}
          style={{
            width: '100%',
            maxWidth: '100%'
          }}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ type: 'component', framework: 'HTML/CSS/JS' }}
        >
          <FormFieldsContainer>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, whitespace: true, message: 'Please input component name!' }]}
            >
              <Input placeholder="Enter component name" />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: 'Please select type!' }]}
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

            <Form.Item
              name="price"
              label="Price"
              rules={[{ type: 'number', transform: (value) => Number(value) }]}
            >
              <Input type="number" placeholder="Enter price" />
            </Form.Item>

            <Form.Item
              name="discountPrice"
              label="Discount Price"
              rules={[{ type: 'number', transform: (value) => Number(value) }]}
            >
              <Input type="number" placeholder="Enter discount price" />
            </Form.Item>
          </FormFieldsContainer>

          <DescriptionItem
            name="description"
            label="Description"
          >
            <Input.TextArea placeholder="Enter description" rows={4} />
          </DescriptionItem>

          <EditorItem label="HTML">
            <EditorContainer>
              <Editor
                height="400px"
                defaultLanguage="html"
                theme="vs-dark"
                value={htmlCode}
                onChange={(value) => setHtmlCode(value || '')}
                options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
              />
            </EditorContainer>
          </EditorItem>

          <EditorItem label="CSS">
            <EditorContainer>
              <Editor
                height="400px"
                defaultLanguage="css"
                theme="vs-dark"
                value={cssCode}
                onChange={(value) => setCssCode(value || '')}
                options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
              />
            </EditorContainer>
          </EditorItem>

          <EditorItem label="JavaScript">
            <EditorContainer>
              <Editor
                height="400px"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={jsCode}
                onChange={(value) => setJsCode(value || '')}
                options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
              />
            </EditorContainer>
          </EditorItem>

          <Form.Item style={{ textAlign: 'center', width: '100%' }}>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={loading}>
                Create Component
              </Button>
              <Button icon={<RollbackOutlined />} onClick={() => navigate('/component')}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </StyledCard>
    </Container>
  );
};

export default ComponentCreate;
