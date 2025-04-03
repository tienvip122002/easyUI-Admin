import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./loginregister.css";

const LoginRegister = () => {
  const [checked, setChecked] = useState(false);
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
        phoneNumber: "" // Để trống vì form không yêu cầu
      });
      navigate('/');
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
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
            <input 
              type="text" 
              name="fullName" 
              placeholder="Full Name" 
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
            />
            <button disabled={loading}>
              {loading ? 'Processing...' : 'Sign up'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">Login</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              required 
            />
            <button disabled={loading}>
              {loading ? 'Processing...' : 'Login'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
