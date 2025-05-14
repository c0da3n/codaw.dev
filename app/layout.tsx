"use client";
import type React from "react";
import "./globals.css";
import { useEffect } from "react";

export default function MyApp({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <>
      <html>
        <body>{children}</body>
      </html>
    </>
  );
}
