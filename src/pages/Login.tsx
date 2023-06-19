import Button from "@/components/common/Button";
import MainLayout from "@/components/layouts/MainLayout";
import { useLogin } from "@/hooks/useAuth";
import { LoginCredentials, LoginErrors } from "@/types/Credentials";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({
    username: "",
    password: "",
  });

  const { mutate, isLoading, isError, error } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateCredentials = (credentials: LoginCredentials) => {
    const errors: LoginErrors = {};

    if (!credentials.username) {
      errors.username = "Username cannot be empty";
    }

    if (!credentials.password || credentials.password.length < 5) {
      errors.password = "Password is invalid, minimum 5 characters";
    }

    return errors as LoginErrors;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors = validateCredentials(credentials);
    setErrors(newErrors);
    if (Object.values(newErrors).every((error) => !error)) {
      mutate(credentials, {
        onSuccess: () => {
          navigate("/");
        },
      });
    }
  };
  return (
    <MainLayout>
      <main className="px-4 sm:px-10 py-10 lg:p-24">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <p className="mx-auto text-3xl font-bold text-center">
              Puzzle Shop
            </p>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={credentials.username}
                    onChange={handleChange}
                    className={`px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.username ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500">{errors.username}</p>
                )}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={credentials.password}
                    onChange={handleChange}
                    className={`px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password}</p>
                )}
              </div>
              <Button
                onClick={handleSubmit}
                className="mt-12"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </form>
            {isError && (
              <div
                className=" mt-5 bg-red-100 border text-sm border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">
                  Error:{" "}
                  {JSON.stringify((error as any).response.data.errorMessage)}
                </span>
              </div>
            )}
            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default Login;
