import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./loginregister.css";

const LoginRegister = () => {
  const [checked, setChecked] = useState(false); // false = sign up, true = login
  const { login, register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await login({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await register({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        fullName: formData.get('fullName') as string,
        phoneNumber: ""
      });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className={`main ${checked ? "signup-mode" : ""}`}>
        {checked ? (
          <div className="login">
            <form onSubmit={handleLogin}>
              <h2>Đăng nhập</h2>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button disabled={loading}>{loading ? 'Processing...' : 'Login'}</button>
              {error && <p className="error-message">{error}</p>}
              <p className="toggle-text">
                Bạn chưa có tài khoản?{" "}
                <span onClick={() => setChecked(false)}>Đăng ký</span>
              </p>
            </form>
          </div>
        ) : (
          <div className="signup">
            <form onSubmit={handleRegister}>
              <h2>Đăng ký</h2>
              <input type="text" name="fullName" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button disabled={loading}>{loading ? 'Processing...' : 'Sign up'}</button>
              {error && <p className="error-message">{error}</p>}
              <p className="toggle-text">
                Bạn đã có tài khoản?{" "}
                <span onClick={() => setChecked(true)}>Đăng nhập</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;

