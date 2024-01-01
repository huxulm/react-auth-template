"use client";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false, });
const HomeContent = dynamic(() => import("@/components/HomeContent"), {ssr: false})

const Home =  () => {
  return (
    <div>
      <Navbar />
      <HomeContent />
    </div>
  );
}

export default Home