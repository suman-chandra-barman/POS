import React from "react";

interface AuthGroupLayoutProps {
  children: React.ReactNode;
}

export default function AuthGroupLayout({ children }: AuthGroupLayoutProps) {
  return <div className="theme-auth min-h-screen w-full">{children}</div>;
}
