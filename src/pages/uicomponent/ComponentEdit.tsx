import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Card, message, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { useUIComponentEdit } from '../../hooks/useUIComponentEdit';
import { UpdateUIComponentRequest } from '../../models/uicomponent';
import { styled } from 'styled-components';

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

const FormFieldsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EditorContainer = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-bottom: 24px;
  overflow: hidden;
  
  &:hover {
    border-color: #40a9ff;
  }
`;

const ComponentEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { component, loading, updating, updateComponent } = useUIComponentEdit(id!);
  
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');

  useEffect(() => {
    if (component) {
      form.setFieldsValue({
        name: component.name,
        description: component.description,
        type: component.type,
        framework: component.framework,
        previewUrl: component.previewUrl,
        price: component.price,
        discountPrice: component.discountPrice
      });
      setHtmlCode(component.html || '');
      setCssCode(component.css || '');
      setJsCode(component.js || '');
    }
  }, [component, form]);

  const handleSubmit = async (values: any) => {
    try {
      console.log('Form values:', values); // Debug log
      console.log('Editor values:', { htmlCode, cssCode, jsCode }); // Debug log

      const submitData: UpdateUIComponentRequest = {
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

      console.log('Submitting data:', submitData); // Debug log

      if (!id) {
        message.error('Component ID is missing');
        return;
      }

      const success = await updateComponent(submitData);
      if (success) {
        message.success('Component updated successfully');
        navigate('/component');
      }
    } catch (error) {
      console.error('Submit Error:', error);
      message.error('Failed to update component');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
      <MainContainer>
        <StyledCard title="Edit UI Component">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={(errorInfo) => {
              console.log('Form validation failed:', errorInfo); // Debug log
            }}
          >
            <FormFieldsContainer>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input component name!' }]}
              >
                <Input size="large" placeholder="Enter component name" />
              </Form.Item>

              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please select type!' }]}
              >
                <Select size="large">
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
                <Select size="large">
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
                <Input size="large" placeholder="Enter preview URL" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Price"
                rules={[{ type: 'number', transform: (value) => Number(value) }]}
              >
                <Input size="large" type="number" placeholder="Enter price" />
              </Form.Item>

              <Form.Item
                name="discountPrice"
                label="Discount Price"
                rules={[{ type: 'number', transform: (value) => Number(value) }]}
              >
                <Input size="large" type="number" placeholder="Enter discount price" />
              </Form.Item>
            </FormFieldsContainer>

            <Form.Item
              name="description"
              label="Description"
            >
              <Input.TextArea
                rows={6}
                placeholder="Enter description"
                style={{ marginBottom: '24px' }}
              />
            </Form.Item>

            <Form.Item label="HTML">
              <EditorContainer>
                <Editor
                  height="400px"
                  defaultLanguage="html"
                  theme="vs-dark"
                  value={htmlCode}
                  onChange={(value) => setHtmlCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineHeight: 24,
                    scrollBeyondLastLine: false
                  }}
                />
              </EditorContainer>
            </Form.Item>

            <Form.Item label="CSS">
              <EditorContainer>
                <Editor
                  height="400px"
                  defaultLanguage="css"
                  theme="vs-dark"
                  value={cssCode}
                  onChange={(value) => setCssCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineHeight: 24,
                    scrollBeyondLastLine: false
                  }}
                />
              </EditorContainer>
            </Form.Item>

            <Form.Item label="JavaScript">
              <EditorContainer>
                <Editor
                  height="400px"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={jsCode}
                  onChange={(value) => setJsCode(value || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineHeight: 24,
                    scrollBeyondLastLine: false
                  }}
                />
              </EditorContainer>
            </Form.Item>

            <Form.Item>
              <Space style={{ float: 'right' }}>
                <Button
                  icon={<RollbackOutlined />}
                  onClick={() => navigate('/component')}
                  size="large"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={updating}
                  size="large"
                >
                  Update Component
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </StyledCard>
      </MainContainer>
    </PageWrapper>
  );
};

export default ComponentEdit; 