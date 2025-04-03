import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CommentView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState({
    id: '',
    content: '',
    componentName: '',
    author: '',
    status: '',
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    // Add API call to fetch comment data
    setComment({
      id: id || '',
      content: 'Sample comment content',
      componentName: 'Button Component',
      author: 'John Doe',
      status: 'Active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }, [id]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">View Comment</h1>
        <button
          onClick={() => navigate('/comment')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
        >
          Back to List
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Content</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{comment.content}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Component</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{comment.componentName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Author</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{comment.author}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{comment.status}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {new Date(comment.createdAt).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Updated At</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
              {new Date(comment.updatedAt).toLocaleString()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default CommentView; 