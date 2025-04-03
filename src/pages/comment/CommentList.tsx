import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/common/Table';

const CommentList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const columns = [
    { key: 'id', header: 'ID', width: '100px' },
    { key: 'componentName', header: 'Component' },
    { key: 'content', header: 'Content' },
    { key: 'author', header: 'Author' },
    { key: 'status', header: 'Status', width: '120px' },
    { key: 'createdAt', header: 'Created At', width: '150px' },
  ];

  // Mock data
  const data = [
    {
      id: '1',
      componentName: 'Button Component',
      content: 'Great component!',
      author: 'John Doe',
      status: 'Active',
      createdAt: new Date().toLocaleDateString(),
    },
    // Add more mock data...
  ];

  const handleView = (id: string) => navigate(`/comment/view/${id}`);
  const handleEdit = (id: string) => navigate(`/comment/edit/${id}`);
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      // Add delete API call here
      console.log('Delete comment:', id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comments</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search comments..."
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={data}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CommentList; 