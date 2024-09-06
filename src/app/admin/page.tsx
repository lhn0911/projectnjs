"use client";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";

export default function Admin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <h1 className="text-2xl font-semibold text-center">UserLogin</h1>
        <nav>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Quản lý user
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Quản lý đề thi
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            Quản lý bài học
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <button
            onClick={toggleMenu}
            className="text-gray-500 focus:outline-none focus:text-gray-700 md:hidden"
          >
            <IoMenu size={24} />
          </button>
          <h1 className="text-2xl font-semibold">Trang Quản Trị</h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          <h2 className="text-xl font-semibold mb-4">Danh Mục Quản Lý</h2>
          {/* Nội dung chính của trang quản trị */}
        </main>
      </div>
    </div>
  );
}
