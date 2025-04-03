import { useState, FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./loginregister.css";

const LoginRegister = () => {
  const [checked, setChecked] = useState(false);
  const { login, register, loading, error } = useAuth();
  
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await login({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await register({
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className={`main ${checked ? "signup-mode" : ""}`}>
        <input
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />

        <div className="signup">
          <form onSubmit={handleRegister}>
            <label htmlFor="chk" aria-hidden="true">Đăng ký</label>
            <input type="text" name="username" placeholder="Tên người dùng" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Mật khẩu" required />
            <button disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">Đăng nhập</label>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Mật khẩu" required />
            <button disabled={loading}>
              {loading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
