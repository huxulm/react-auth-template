"use client";
import useUserQuery from "./hooks/useUserQuery";
import { useAuthState } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"),{ ssr: false })

export default function Dashboard() {
  const { isLogin } = useAuthState();
  const { data: user = {}, loading, error } = useUserQuery();
  return (
    <div>
      <Navbar />
      <section className="dashboard">
        {(() => {
          if (loading) return <p>Loading user info...</p>;
          if (error) return <p>Oops! something went wrong</p>;
          return (
            <>
              <h1 className="dashboard__title">Dashboard</h1>
              <h3 className="dashboard__sub__title">User</h3>
              <hr></hr>
              {isLogin && (
                <div className="dashboard_info">
                  <p>ID: {user.id}</p>
                  <p>Name: {user.name}</p>
                </div>
              )}
            </>
          );
        })()}
      </section>
    </div>
  );
}
