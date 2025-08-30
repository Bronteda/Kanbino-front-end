import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { signUp } from "../../services/authServices";

const SignUpForm = () => {
  const initialState = {
    name: "",
    username: "",
    password: "",
  };

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setMessage("");
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      setMessage("");
      navigate("/");
    } catch (error) {
      setMessage(error.message.trim());
    }
  };

  const isFormInvalid = () => {
    return !(formData.username && formData.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#3C75A6] mb-6">
          Sign Up
        </h1>

        {message && (
          <p className="text-red-500 text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F36A1B] focus:outline-none"
            />
          </div>

          {/* Username */}
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
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F36A1B] focus:outline-none"
            />
          </div>

          {/* Password */}
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
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F36A1B] focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={isFormInvalid()}
              className="w-full px-4 py-2 bg-[#F36A1B] text-white font-semibold rounded-lg shadow hover:bg-orange-600 disabled:opacity-50 transition-colors"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
