"use client";

import React, { useState } from "react";
import { Table, Button, Input, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartService, Cart } from "../../services/cart.service";
import { 
  CreateCartSchema, 
  CreateCartRequest, 
  UpdateCartRequest 
} from "../../validations/cart.schema";
import * as yup from 'yup';

const CartsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [newCart, setNewCart] = useState<CreateCartRequest>({
    uiComponentId: "",
    quantity: 1
  });

  // Queries
  const { data: carts, isLoading, error } = useQuery({
    queryKey: ["carts"],
    queryFn: () => cartService.getCarts()
  });

  // Mutations
  const createCart = useMutation({
    mutationFn: (data: CreateCartRequest) => cartService.createCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      message.success("Đã thêm sản phẩm vào giỏ hàng");
      setNewCart({ uiComponentId: "", quantity: 1 });
    }
  });

  const updateCart = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { quantity: number } }) => 
      cartService.updateCart(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      message.success("Đã cập nhật số lượng");
    }
  });

  const deleteCart = useMutation({
    mutationFn: (id: string) => cartService.deleteCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      message.success("Đã xóa sản phẩm khỏi giỏ hàng");
    }
  });

  // Handlers
  const handleCreate = async () => {
    try {
      await CreateCartSchema.validate(newCart);
      await createCart.mutateAsync(newCart);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        message.error(error.message);
      } else {
        message.error("Có lỗi xảy ra khi thêm sản phẩm");
      }
    }
  };

  const handleUpdate = async (id: string, quantity: number) => {
    try {
      await UpdateCartSchema.validate({ quantity });
      await updateCart.mutateAsync({ id, data: { quantity } });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        message.error(error.message);
      } else {
        message.error("Có lỗi xảy ra khi cập nhật");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCart.mutateAsync(id);
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  // Fix type cho handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCart((prev: CreateCartRequest) => ({
      ...prev,
      uiComponentId: e.target.value
    }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCart((prev: CreateCartRequest) => ({
      ...prev,
      quantity: parseInt(e.target.value) || 1
    }));
  };

  // Table columns
  const columns: ColumnsType<Cart> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Component",
      dataIndex: "uiComponentName",
      key: "uiComponentName",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <Input
          type="number"
          value={record.quantity}
          onChange={(e) => handleUpdate(record.id, parseInt(e.target.value))}
          style={{ width: 80 }}
        />
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => handleDelete(record.id)}>
          Xóa
        </Button>
      ),
    },
  ];

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Có lỗi xảy ra</h1>
        <p>{(error as any).message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Quản lý giỏ hàng
      </h1>
      
      <div style={{ marginBottom: 24, display: "flex", gap: 16 }}>
        <Input
          placeholder="ID Component"
          value={newCart.uiComponentId}
          onChange={handleInputChange}
          style={{ width: 200 }}
        />
        <Input
          type="number"
          min={1}
          placeholder="Số lượng"
          value={newCart.quantity}
          onChange={handleQuantityChange}
          style={{ width: 120 }}
        />
        <Button 
          type="primary" 
          onClick={handleCreate}
          loading={createCart.isPending}
        >
          Thêm mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={carts || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} sản phẩm`
        }}
      />
    </div>
  );
};

export default CartsPage; 