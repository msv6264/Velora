"use client";
import Landing from "../components/Landing";
import Nav from "../components/Nav";


export default function Home() {
  return (
    <div className="bg-[#060007] p-5 text-white">
      <div className="mt-5 w-[90%] mx-auto ">
        <Nav />
      </div>
      <Landing />
    </div>
  );
}
