"use client";
import Navbar from "@/components/Navbar";
import useUserQuery from "./hooks/useUserQuery";
import { useAuthState } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { data: user = {}, loading, error } = useUserQuery();
  if (loading) return <p>Loading user info...</p>;
  if (error) return <p>Oops! something went wrong</p>;
  const { isLogin } = useAuthState();
  return (
    <div>
      <Navbar />
      <section className="dashboard">
        <h1 className="dashboard__title">Dashboard</h1>
        <h3 className="dashboard__sub__title">User</h3>
        <hr></hr>
        {isLogin && (
          <div className="dashboard_info">
            <p>ID: {user.id}</p>
            <p>Name: {user.name}</p>
          </div>
        )}
      </section>
    </div>
  );
}
