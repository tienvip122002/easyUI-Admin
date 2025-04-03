import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/common/Table';

const TagList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    { key: 'id', header: 'ID', width: '100px' },
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description' },
    { key: 'usageCount', header: 'Usage Count', width: '120px' },
    { key: 'createdAt', header: 'Created At', width: '150px' },
  ];

  // Mock data
  const data = [
    {
      id: '1',
      name: 'React',
      description: 'React components',
      usageCount: 15,
      createdAt: new Date().toLocaleDateString(),
    },
  ];

  const handleView = (id: string) => navigate(`/tag/view/${id}`);
  const handleEdit = (id: string) => navigate(`/tag/edit/${id}`);
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      console.log('Delete tag:', id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tags</h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={() => navigate('/tag/create')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
        >
          + Create Tag
        </button>
      </div>

      <Table
        columns={columns}
        data={data}
        searchTerm={searchTerm}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TagList;