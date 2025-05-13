import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <TextArea
      value={value}
      onChange={handleChange}
      placeholder="Write your content in markdown format here..."
      autoSize={{ minRows: 10, maxRows: 30 }}
    />
  );
};

export default MarkdownEditor; 