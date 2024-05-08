import React, { useState } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const { name, email } = formData;

  return (
    <section className="max-w-6xl mx-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-center mt-4 px-3">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6">
        <form>
          <input
            type="text"
            id="name"
            value={name}
            disabled
            className="w-full bg-white px-4 py-2 border text-gray-700 border-gray-300 rounded text-xl transition ease-in-out mb-6 "
          />
          <input
            type="text"
            id="email"
            value={email}
            disabled
            className="w-full bg-white px-4 py-2 text-gray-700 border border-gray-300 rounded text-xl transition ease-in-out mb-6 "
          />
        </form>
        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
          <p className="flex items-center">
            Do you want change your name?<span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer ml-2">Edit</span>
          </p>
          <p className="text-blue-600 hover:text-blue-700 transition ease-in-out cursor-pointer">Sign out</p>
        </div>
      </div>
    </section>
  );
}
