import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../api/apiFetch";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (isRegister) {
      try {
        const response = await apiFetch(
          "/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setMessage("Registration successful! 🎉");

        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Registration failed"
        );
      }
    }
    else {
      try {
        const response = await apiFetch(
          "/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        // Save JWT token
        localStorage.setItem("token", data.token);

        // Save logged-in user
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        navigate("/products");

      } catch (error) {
        setMessage(
          error instanceof Error
            ? error.message
            : "Login failed"
        );
      }
    }
  };

  return (
    <div className="login-page">
      <h1>
        {isRegister ? "Create Account" : "Login"}
      </h1>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <button
        type="button"
        onClick={() => {
          setIsRegister(!isRegister);
          setMessage("");
        }}
      >
        {isRegister
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default Login;