// components/Login.tsx
import Button from '@/components/ui/Button';
import useAuthStore from '@/store/authStore';
import React from 'react';
import { BsGoogle } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';

const Login = () => {
  const login = useAuthStore((state) => state.login);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#0f0f1a] to-[#1a1a2e] px-4">
      <div className="w-full max-w-md bg-[#0f0f1a] text-white rounded-2xl p-8 shadow-xl border border-[#2a2a40]">
        <h2 className="text-2xl font-semibold text-center">
          Sign In to Your Account
        </h2>
        <p className="text-sm text-center text-gray-400 mt-2">
          Welcome to a smarter way of managing tasks and products. Our
          comprehensive suite is designed to streamline your workflow, enhance
          collaboration.
        </p>

        <button
          className="mt-6 w-full flex items-center justify-center gap-2 bg-transparent border border-gray-600 rounded-md py-2 text-sm hover:bg-gray-800 transition "
          onClick={login}
        >
          <BsGoogle className="text-lg" />
          Sign in with Google
        </button>

        <div className="relative my-6 text-center text-gray-500">
          <span className="bg-[#0f0f1a] px-2 relative z-10">Or</span>
          <div className="absolute left-0 top-1/2 w-full h-px bg-gray-700 -z-0 transform -translate-y-1/2"></div>
        </div>

        <form className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm mb-1 block text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full bg-black border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="text-sm mb-1 block text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full bg-black border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 pr-10"
            />
            <FiEye className="absolute right-3 top-10 transform -translate-y-1/2 text-gray-400 cursor-pointer" />
          </div>

          <div className="text-right text-sm text-blue-400 cursor-pointer hover:underline">
            Forgot your password?
          </div>

          <Button
            className="mt-2 w-full bg-gradient-to-r from-[#6a5af9] to-[#8b5cf6] hover:opacity-90 text-white font-medium py-2 rounded-lg transition"
            text="Sign In"
            onClick={login}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
