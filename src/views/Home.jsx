"use client";
import Landing from "../components/Landing";
import Nav from "../components/Nav";


export default function Home() {
  return (
    <div className="bg-[#060007] p-4 sm:p-5 text-white overflow-x-hidden">
      <div className="mt-2 sm:mt-5 w-full md:w-[90%] mx-auto ">
        <Nav />
      </div>
      <Landing />
    </div>
  );
}

