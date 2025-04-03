const Components = () => {
  const buttons = [
    { type: 'Primary Button', class: 'bg-blue-500 hover:bg-blue-600' },
    { type: 'Secondary Button', class: 'bg-gray-500 hover:bg-gray-600' },
    { type: 'Success Button', class: 'bg-green-500 hover:bg-green-600' },
    { type: 'Danger Button', class: 'bg-red-500 hover:bg-red-600' },
    { type: 'Warning Button', class: 'bg-yellow-500 hover:bg-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">About Easy-UI</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {buttons.map((button, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-colors duration-200">
            <button className={`w-full ${button.class} text-white py-2 px-4 rounded-md`}>
              {button.type}
            </button>
            <div className="mt-4 bg-gray-200 dark:bg-gray-700 h-40 rounded-md transition-colors duration-200"></div>
            <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-orange-500 text-white rounded text-sm">Html</span>
              <span className="px-2 py-1 bg-blue-500 text-white rounded text-sm">Css</span>
              <span className="px-2 py-1 bg-green-500 text-white rounded text-sm">Buy Now</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Components; 