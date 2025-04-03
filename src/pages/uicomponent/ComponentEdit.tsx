import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { UIComponent, UpdateUIComponentDto } from '../../models/uicomponent';
import { UIComponentService } from '../../services/uicomponent.service';

const { Option } = Select;

const ComponentEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [component, setComponent] = useState<UIComponent | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchComponent = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await UIComponentService.getById(id);
        setComponent(data);
        form.setFieldsValue(data);
      } catch (error) {
        message.error('Failed to fetch component');
      } finally {
        setLoading(false);
      }
    };

    fetchComponent();
  }, [id, form]);

  const onFinish = async (values: UpdateUIComponentDto) => {
    if (!id) return;
    try {
      setLoading(true);
      await UIComponentService.update(id, values);
      message.success('Component updated successfully');
      navigate('/component');
    } catch (error) {
      message.error('Failed to update component');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Edit UI Component">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={component || {}}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input component name!' }]}
        >
          <Input />
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
          </Select>
        </Form.Item>

        <Form.Item name="html" label="HTML">
          <Editor
            height="200px"
            defaultLanguage="html"
            value={component?.html || ''}
          />
        </Form.Item>

        <Form.Item name="css" label="CSS">
          <Editor
            height="200px"
            defaultLanguage="css"
            value={component?.css || ''}
          />
        </Form.Item>

        <Form.Item name="js" label="JavaScript">
          <Editor
            height="200px"
            defaultLanguage="javascript"
            value={component?.js || ''}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update Component
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ComponentEdit; 