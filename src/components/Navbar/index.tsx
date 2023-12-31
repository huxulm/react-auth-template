"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthState, useAuthDispatch } from "@/contexts/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { isLogin } = useAuthState();
  const { onLogout } = useAuthDispatch();
  return (
    <nav>
      <ul className="links">
        <li>
          <Link href="/" className={`link ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
        </li>
        {isLogin && <li>
          <Link
            href="/dashboard"
            className={`link ${pathname === "/dashboard" ? "active" : ""}`}
          >
            Dashboard
          </Link>
        </li>}
        {isLogin && (
          <li>
            <a
              className={`link ${pathname === "/logout" ? "active" : ""}`}
              onClick={onLogout}
            >
              Logout
            </a>
          </li>
        )}
        {!isLogin && (
          <li>
            <Link
              href="/login"
              className={`link ${pathname === "/login" ? "active" : ""}`}
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
