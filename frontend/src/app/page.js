'use client';
import LandingPageMain from "@/components/landingPage/LandingPageMain";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <LandingPageMain/>
    </div>
  );
}
