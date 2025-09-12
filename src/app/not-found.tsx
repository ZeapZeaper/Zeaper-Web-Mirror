"use client";
import Link from "next/link";

const NotFound = () => {
  const landingPage = typeof window !== "undefined" ? localStorage.getItem("landingPage") || "/" : "/";
  
  return (
    <div className="container">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-5 py-24">
        <h1
          className="text-[100px] font-extrabold text-primary"
          style={{ lineHeight: "1em" }}
        >
          404
        </h1>
        <h4 className="text-4xl font-semibold">Page Not Found</h4>
        <Link href={landingPage} className="border-2 border-primary text-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
