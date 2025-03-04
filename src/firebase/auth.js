import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from "firebase/auth";
import { auth } from "./firebaseConfig";

const googleProvider = new GoogleAuthProvider();

// ✅ Improved Sign Up Function with Better Error Handling
export const signUpWithEmail = async (firstName, lastName, email, password, confirmPassword) => {
  if (!email || !password || !firstName || !lastName) throw new Error("All fields are required");

  if (password !== confirmPassword) throw new Error("Passwords do not match");

  const strongPasswordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPasswordRegex.test(password)) throw new Error("Password must contain letters, numbers, and a special character");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // ✅ Send email verification
    await sendEmailVerification(userCredential.user);
    
    return "A verification email has been sent. Please verify your email before logging in.";
  } catch (error) {
    console.error("Signup Error:", error.message);

    if (error.code === "auth/email-already-in-use") {
      throw new Error("Email is already registered. Please sign in.");
    }

    throw error;
  }
};

// ✅ Sign In Function with Email Verification Check
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (!userCredential.user.emailVerified) {
      throw new Error("Please verify your email before logging in.");
    }

    return userCredential.user;
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

// ✅ Google Sign-In
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Login Error:", error.message);
    throw error;
  }
};

// ✅ Logout Function
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw error;
  }
};


export { auth };