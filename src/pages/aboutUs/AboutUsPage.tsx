import React, { useState, useEffect } from 'react';
import { Table, Button, message, Input, Space } from 'antd';
import { useGetAboutUs, useDeleteAboutUs, useSearchAboutUs } from '../../hooks/useAboutUs';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const AboutUsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: aboutUsList, isLoading } = useGetAboutUs();
  const deleteAboutUs = useDeleteAboutUs();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data: searchResults, refetch } = useSearchAboutUs(searchKeyword);

  const handleDelete = (id: string) => {
    deleteAboutUs.mutate(id, {
      onSuccess: () => {
        message.success('Xóa thành công');
      },
      onError: () => {
        message.error('Có lỗi xảy ra khi xóa');
      },
    });
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
  };

  useEffect(() => {
    if (searchKeyword) {
      refetch();
    }
  }, [searchKeyword, refetch]);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Điện thoại', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <>
          <Button onClick={() => navigate(`/aboutUs/edit/${record.id}`)}>Sửa</Button>
          <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Quản lý About Us</h1>
      <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
        <Search
          placeholder="Tìm kiếm"
          onSearch={handleSearch}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" onClick={() => navigate('/aboutUs/create')} style={{ float: 'right' }}>
          Thêm mới
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={searchKeyword ? searchResults : aboutUsList}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
};

export default AboutUsPage; 