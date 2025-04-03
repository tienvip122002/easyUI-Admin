import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <Outlet /> {/* Đừng quên dòng này để render nội dung */}
    </div>
  );
};

export default AuthLayout;
