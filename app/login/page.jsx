"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/app/context/AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const { setIsAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { username, password };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("access_token", data.tokens.access);
        localStorage.setItem("user_role", data.user.role);
        Cookies.set("token", data.tokens.access, { expires: 7 });
        setIsAuthenticated(true);
        if (data.user.role === "user") {
          router.push("/profile");
        } else if (data.user.role === "restaurant_owner") {
          router.push("/dashboard");
        }
      }

      if (!res.ok) {
        setErrors(data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="font-medium text-black">
              Create an account
            </a>
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="">
              {errors && (
                <div className="text-red-500 text-sm">{errors?.error}</div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
