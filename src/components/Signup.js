import React, { useRef, useState } from "react";
import { signUpWithEmail } from "../firebase/auth";

const Signup = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    try {
      const result = await signUpWithEmail(firstName, lastName, email, password, confirmPassword);
      setMessage(result);
      setError("");
    } catch (error) {
      setError(error.message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        <form onSubmit={handleSignup}>
          <input type="text" placeholder="First Name" ref={firstNameRef} required className="w-full p-2 border rounded mt-2" />
          <input type="text" placeholder="Last Name" ref={lastNameRef} required className="w-full p-2 border rounded mt-2" />
          <input type="email" placeholder="Email" ref={emailRef} required className="w-full p-2 border rounded mt-2" />
          
          <div className="relative mt-2">
            <input type={showPassword ? "text" : "password"} placeholder="Password" ref={passwordRef} required className="w-full p-2 border rounded" />
            <button type="button" className="absolute inset-y-0 right-2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>

          <input type="password" placeholder="Confirm Password" ref={confirmPasswordRef} required className="w-full p-2 border rounded mt-2" />
          
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Sign Up</button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;