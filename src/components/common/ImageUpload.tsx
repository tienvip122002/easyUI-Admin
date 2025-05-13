import React, { useState } from 'react';
import { Upload, Button, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    
    if (newFileList.length > 0 && newFileList[0].status === 'done') {
      const url = newFileList[0].response?.url || '';
      onChange?.(url);
      message.success('Upload successful!');
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/upload',
    fileList,
    onChange: handleChange,
    maxCount: 1,
    listType: 'picture',
    accept: 'image/*',
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      }
      return isImage || Upload.LIST_IGNORE;
    },
  };

  return (
    <div>
      {value && (
        <div style={{ marginBottom: '16px' }}>
          <Image
            src={value}
            alt="Featured image"
            width={200}
            style={{ borderRadius: '4px' }}
          />
        </div>
      )}
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Upload Image</Button>
      </Upload>
      <div style={{ marginTop: '8px', fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)' }}>
        Supported formats: JPG, PNG, GIF. Max size: 5MB
      </div>
    </div>
  );
};

export default ImageUpload; 