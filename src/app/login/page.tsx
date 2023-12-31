"use client";
import Navbar from "@/components/Navbar";
import { useAuthDispatch } from "@/contexts/AuthContext";

export default function Login() {
  const { onLoginFormChange, onLogin } = useAuthDispatch();
  return (
    <div>
      <Navbar />
      <div className="login">
        <input
          name="email"
          placeholder="email"
          onChange={onLoginFormChange}
        ></input>
        <input
          name="password"
          placeholder="password"
          onChange={onLoginFormChange}
        ></input>
        <button onClick={() => {
          onLogin().then(() => {
            window.location.href = "/dashboard"
          })
        }}>Login</button>
      </div>
    </div>
  );
}
