import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Button, Card, message, Spin } from 'antd';
import { profileService } from '../../services/profile.service';
import type { Profile } from '../../models/profile';

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Fetch profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileService.getProfile(),
  });

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: (values: UpdateProfileRequest) => 
      profileService.updateProfile(values),
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
      message.success('Cập nhật thông tin thành công!');
    },
    onError: () => {
      message.error('Có lỗi xảy ra khi cập nhật thông tin');
    },
  });

  const onFinish = (values: any) => {
    updateProfile.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card title="Thông tin cá nhân" className="shadow-md">
        <Form
          form={form}
          layout="vertical"
          initialValues={profile}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={updateProfile.isPending}
              className="w-full"
            >
              Cập nhật thông tin
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage; 