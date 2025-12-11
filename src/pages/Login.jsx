import React from 'react'
import { useTokens } from '../store/tokenStore'
import { useState } from 'react';

const Login = () => {
  const { setAccessToken, setRefreshToken, refreshToken, clearTokens } = useTokens();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (title, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [title]: value
    }));
  };



  const handleLogin = async () => {
    try {
      const response = await fetch("https://ilkinibadov.com/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
      }
    } catch (error) {

    }
  }


  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border border-zinc-300 p-5 max-w-[300px] w-full h-fit flex flex-col gap-5 ">
        <input value={formData?.email} className="border border-zinc-300 p-2" placeholder="Enter your mail" onChange={(e) => {
          handleInputChange("email", e.target.value);
        }}
          type="email"
        />

        <input value={formData?.password} className="border border-zinc-300 p-2" placeholder="Enter your password" onChange={(e) => {
          handleInputChange("password", e.target.value);
        }}
          type="password"
        />

        <button className="bg-slate-900 text-white py-2" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login