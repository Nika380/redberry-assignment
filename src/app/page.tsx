/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable react/jsx-key */
import HeaderComponent from "@/components/HeaderComponent";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Index({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "" || pathname === "/") {
      router.push("/blogs");
    }
  }, [pathname]);
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  );
}
