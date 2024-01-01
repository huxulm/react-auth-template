"use client";
import { useAuthState } from "@/contexts/AuthContext";
import Link from "next/link";

export default function HomeContent() {
  const { isLogin } = useAuthState();

  return (
    <div className="home">
      {isLogin && <div>Yeah!Now you are logged in</div>}
      {!isLogin && (
        <div>
          Haven't login, Go to <Link href="/login">Login</Link>
        </div>
      )}
    </div>
  );
}
