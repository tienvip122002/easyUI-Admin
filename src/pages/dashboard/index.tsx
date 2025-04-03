const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">About Easy-UI</h2>
      <div className="grid grid-cols-5 gap-4 mb-6">
        {["Primary", "Secondary", "Success", "Danger", "Warning"].map((type, i) => (
          <div key={i} className="border p-3 rounded shadow bg-white dark:bg-gray-800">
            <button
              className={`px-3 py-1 rounded text-white text-sm mb-2 ${getColor(type)}`}
            >
              {type} Button
            </button>
            <img
              src="https://i.imgur.com/E5ZQZzj.png"
              className="w-full h-24 object-cover mb-2"
              alt={`${type} Button`}
            />
            <div className="flex justify-between">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">Html</span>
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Css</span>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Buy Now</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-purple-200 dark:bg-purple-900 text-center p-6 rounded-md">
        <div className="grid grid-cols-3 gap-4 text-left">
          <div>
            <h3 className="font-bold mb-2">About Easy-UI</h3>
            <p className="text-sm">
              Easy-UI is a modern UI library that helps developers build beautiful and responsive web applications with ease.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Contact Us</h3>
            <p className="text-sm">Email: support@easy-ui.com</p>
            <p className="text-sm">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <p className="text-xs mt-6">© 2023 Easy-UI. All rights reserved.</p>
      </div>
    </div>
  );
};

function getColor(type: string) {
  switch (type) {
    case "Primary":
      return "bg-blue-600";
    case "Secondary":
      return "bg-gray-600";
    case "Success":
      return "bg-green-600";
    case "Danger":
      return "bg-red-600";
    case "Warning":
      return "bg-yellow-500 text-black";
    default:
      return "";
  }
}

export default Dashboard;
