import React, { useRef, useState } from "react";
import { loginWithEmail, loginWithGoogle } from "../firebase/auth";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" ref={emailRef} required className="w-full p-2 border rounded mt-2" />

          <div className="relative mt-2">
            <input type={showPassword ? "text" : "password"} placeholder="Password" ref={passwordRef} required className="w-full p-2 border rounded" />
            <button type="button" className="absolute inset-y-0 right-2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Sign In</button>
        </form>

        <button onClick={loginWithGoogle} className="w-full bg-red-500 text-white p-2 rounded mt-4">Sign In with Google</button>
      </div>
    </div>
  );
};

export default Login;