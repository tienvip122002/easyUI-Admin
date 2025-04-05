import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, Squares2X2Icon, TagIcon, ChatBubbleLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: HomeIcon, label: 'Dashboard' },
    { path: '/component', icon: Squares2X2Icon, label: 'UI Components' },
    { path: '/tag', icon: TagIcon, label: 'Tags' },
    { path: '/category', icon: Cog6ToothIcon, label: 'Categories' },
    { path: '/comment', icon: ChatBubbleLeftIcon, label: 'Comments' },
  ];
  

  return (
    <div className="h-full w-full  flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-4">
        <h1 className={`text-white text-xl font-bold transition-all duration-300
          ${isCollapsed ? 'scale-0 w-0' : 'scale-100 w-auto'}`}>
          Smart UI Admin
        </h1>
        {isCollapsed && (
          <span className="text-white text-2xl font-bold">S</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white
                ${isActive ? 'bg-gray-700 text-white' : ''}
                ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`h-6 w-6 ${!isCollapsed && 'mr-3'}`} />
              <span className={`transition-all duration-300
                ${isCollapsed ? 'hidden' : 'block'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
