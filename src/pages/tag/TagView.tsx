import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TagView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tag, setTag] = useState({
    name: '',
    description: '',
    usageCount: 0,
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    // Add API call to fetch tag data
    setTag({
      name: 'Sample Tag',
      description: 'Sample description',
      usageCount: 15,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">View Tag</h1>
        <button
          onClick={() => navigate('/tag')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
        >
          Back to List
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{tag.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Usage Count</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{tag.usageCount}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{tag.description}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {new Date(tag.createdAt).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {new Date(tag.updatedAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default TagView; 