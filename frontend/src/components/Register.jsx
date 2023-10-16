import RegisterForm from "./RegisterForm";
import api from "../apiService";
import { useLocation } from "wouter";

function Register() {
  const [_, setLocation] = useLocation();

  const handleSubmit = async ({username, password}) => {
    // e.preventDefault();

    const res = await api.postRegister(username, password)
    if (res.status === 200) {
      console.log('Registration successful');
      setLocation("/login?registered=true");
    } else {
      console.log('Registration failed');
      // setError(true);
    }
  };

  return (
    <>
      Register
      <RegisterForm handleSubmit={handleSubmit} />
    </>
  )
}

export default Register;
