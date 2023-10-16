import LoginForm from "./LoginForm";
import api from "../apiService";

function Login() {

  const handleSubmit = async ({ username, password }) => {
    // e.preventDefault();

    const res = await api.postLogin(username, password);
    if (res.status === 200) {
      console.log('Login successful');
      login(res.data);
    } else {
      console.log('Login failed');
      setError(true);
    }
  };

  return (
    <>
      Login
      <LoginForm handleSubmit={handleSubmit} />
    </>
  )
}

export default Login;
