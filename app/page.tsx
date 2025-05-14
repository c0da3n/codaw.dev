"use client";
import dynamic from "next/dynamic";

// Import the component with no SSR
const InteractiveSvgEffect = dynamic(
  () => import("@/components/interactive-svg-effect"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen">
      <InteractiveSvgEffect />
    </main>
  );
}
