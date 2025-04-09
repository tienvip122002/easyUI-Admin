import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, Button, message, Select } from 'antd';
import { orderService } from '../../services/order.service';
import type { Order } from '../../models/order';

const { Option } = Select;

const OrdersPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getOrders(),
  });

  const updateOrderStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      orderService.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      message.success('Cập nhật trạng thái đơn hàng thành công!');
    },
    onError: () => {
      message.error('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng');
    },
  });

  const handleStatusChange = (id: string, status: string) => {
    updateOrderStatus.mutate({ id, status });
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tổng tiền', dataIndex: 'totalAmount', key: 'totalAmount' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record: Order) => (
        <Select
          defaultValue={record.status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          <Option value="Success">Success</Option>
          <Option value="Pending">Pending</Option>
          <Option value="PaymentFailed">PaymentFailed</Option>
        </Select>
      ),
    },
  ];

  return (
    <div>
      <h1>Quản lý đơn hàng</h1>
      <Table
        columns={columns}
        dataSource={orders}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  );
};

export default OrdersPage; 