import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import api from "../../Utils/api";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  selectUser,
} from "../../Redux/Slices/UserSlice";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [navigating, setNavigating] = useState(false);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      dispatch(signInFailure("Please fill in both fields."));
      return;
    }
    try {
      dispatch(signInStart());
      const res = await api.post(
        "/login",
        { username, password },
        { withCredentials: true }
      );

      dispatch(signInSuccess(res.data));
      setNavigating(true);

      setTimeout(() => {
        setNavigating(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      dispatch(signInFailure(errMsg));
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
    } finally {
      dispatch(signOutSuccess());
    }
  };

  return (
    <div className="min-h-[60vh] flex container mx-auto my-12 ">
      {/* Left Side - Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 flex-col justify-center relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-lg">
          {!user ? (
            <>
              <div className="mb-8">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                  Welcome to Admin Dashboard
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Manage your application with ease. Access powerful tools and
                  insights to streamline your workflow.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <svg
                    className="w-10 h-10 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                  You're All Set!
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Your session is active and secured. You now have full access
                  to all administrative features and controls.
                </p>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-400 text-sm">Logged in as</p>
                    <p className="text-blue-400 text-xl font-semibold">
                      {user.username}
                    </p>
                    {user.role && (
                      <span className="inline-block mt-1 px-3 py-1 bg-blue-400/30 bg-opacity-20 rounded-full text-xs text-blue-400">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {!user ? (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600">
                  Enter your credentials to continue
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={username}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5 text-gray-400 hover:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-gray-400 hover:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Protected by enterprise-grade security
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome Back
                </h2>
                <p className="text-xl text-gray-600 font-medium">
                  {user.username}
                </p>
                {user.role && (
                  <span className="inline-block mt-2 px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {user.role}
                  </span>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">
                      Active Session
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">Connected</span>
                </div>
                <p className="text-sm text-gray-600">
                  You have full access to all administrative features
                </p>
              </div>
              <button
                type="submit"
                disabled={navigating}
                className="w-full mb-2 bg-linear-to-r from-blue-400 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-800 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {navigating ? "Navigating to Admin Dashboard..." : "Login"}
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-linear-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-300 transition transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
