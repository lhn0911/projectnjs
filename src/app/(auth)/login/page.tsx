"use client";
import React, { useState } from "react";
import { FaLock, FaFacebook, FaGoogle } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import bcrypt from "bcryptjs"; // for password comparison

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Handle login
  const handleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      const users = response.data;

      // Find the user by email
      const user = users.find((user: any) => user.email === email);

      if (user) {
        // Compare entered password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
          // Login successful, show modal with success message
          setModalContent("Đăng nhập thành công!");
          setIsModalOpen(true);
        } else {
          // Password does not match, show error message in modal
          setModalContent("Mật khẩu không đúng. Vui lòng thử lại.");
          setIsModalOpen(true);
        }
      } else {
        // No user found with the entered email, show error message in modal
        setModalContent("Email không tồn tại. Vui lòng kiểm tra lại.");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setModalContent("Đã xảy ra lỗi. Vui lòng thử lại.");
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6">Đăng Nhập</h1>
        <div className="mb-4 relative">
          <AiOutlineMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="email"
            placeholder="Email hoặc Tên đăng nhập"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-6 relative">
          <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <FiEye className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer" />
        </div>
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-md w-full mb-4 hover:from-blue-600 hover:to-purple-600"
        >
          ĐĂNG NHẬP
        </button>
        <p className="text-gray-500 mb-4">hoặc</p>
        <div className="flex gap-4 items-center justify-center">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700">
            <FaFacebook className="mr-2" /> Facebook
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center hover:bg-red-600">
            <FaGoogle className="mr-2" /> Google
          </button>
        </div>
        <p className="text-gray-500 mt-6">
          Bạn chưa có tài khoản?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Đăng kí ngay!
          </a>
        </p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">{modalContent}</h2>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
