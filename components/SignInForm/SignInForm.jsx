import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { signIn } from "../../services/authServices";

const SignInForm = () => {
  const initialState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setMessage("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await signIn(formData);
      setUser(user);
      setMessage("");
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => !(formData.username && formData.password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#3C75A6] mb-6">
          Sign In
        </h1>

        {message && (
          <p className="text-red-500 text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F36A1B] focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F36A1B] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isFormInvalid()}
            className="w-full px-4 py-2 bg-[#F36A1B] text-white font-semibold rounded-lg shadow hover:bg-orange-600 disabled:opacity-50 transition-colors"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-gray-600 pt-1">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/sign-up")}
              className="text-[#3C75A6] hover:underline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
