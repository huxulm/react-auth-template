"use client";
import Navbar from "@/components/Navbar";
import { useAuthDispatch } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { onLoginFormChange, onLogin } = useAuthDispatch();
  const router = useRouter();
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
        <button
          onClick={() => {
            onLogin().then(() => {
              router.push("/dashboard");
            });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
