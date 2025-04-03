import { Home, LayoutGrid, Tag, MessageCircle, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-8">Smart UI Studio</div>
      <NavItem to="/" icon={<Home size={18} />} label="Dashboard" />
      <NavItem to="/components" icon={<LayoutGrid size={18} />} label="Components" />
      <NavItem to="/tags" icon={<Tag size={18} />} label="Tags" />
      <NavItem to="/comments" icon={<MessageCircle size={18} />} label="Comments" />
      <NavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
    </div>
  );
};

const NavItem = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-700 transition ${
          isActive ? "bg-gray-700" : ""
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
