"use client";

import { useRef, useEffect, useState } from "react";

export default function InteractiveSvgEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isTouchingRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Only run on client-side
  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setIsMobile(window.innerWidth < 768); // Set mobile breakpoint
    };

    updateCanvasSize();

    let particles: {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      scatteredColor: string;
      life: number;
    }[] = [];

    let textImageData: ImageData | null = null;

    function createSvgImage() {
      if (!ctx || !canvas) return 0;

      ctx.fillStyle = "#3F59A8";
      ctx.save();

      const svgHeight = isMobile ? 150 : 263;
      const svgWidth = (svgHeight * 486) / 263; // Maintain aspect ratio

      ctx.translate(
        canvas.width / 2 - svgWidth / 2,
        canvas.height / 2 - svgHeight / 2
      );
      const svgScale = svgHeight / 263;
      ctx.scale(svgScale, svgScale);

      // Draw the SVG paths
      // P path
      ctx.beginPath();
      ctx.moveTo(77.6092, 74);
      ctx.lineTo(131, 74);
      ctx.lineTo(131, 92.5);
      ctx.bezierCurveTo(124.835, 122.514, 108.582, 141.862, 90.2689, 141.862);
      ctx.bezierCurveTo(81.0608, 141.862, 61.6471, 144.218, 61.6471, 161.724);
      ctx.bezierCurveTo(61.6471, 179.529, 80.5104, 181.586, 90.2689, 181.586);
      ctx.bezierCurveTo(118.356, 181.586, 127.974, 219.553, 130.958, 231.334);
      ctx.lineTo(131, 231.5);
      ctx.lineTo(131, 250);
      ctx.lineTo(77.6092, 250);
      ctx.bezierCurveTo(50.7877, 250, 0, 229.736, 0, 161.172);
      ctx.bezierCurveTo(0, 93.4973, 54.6406, 74, 77.6092, 74);
      ctx.closePath();
      ctx.fill();

      // Circles
      ctx.beginPath();
      ctx.arc(186.137, 218.137, 32.3561, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(274.137, 33.1368, 32.3561, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(186.137, 123.137, 32.3561, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(274.457, 122.249, 32.3561, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(277.968, 217.353, 32.3561, 0, Math.PI * 2);
      ctx.fill();

      // Complex path
      ctx.beginPath();
      ctx.moveTo(254.709, 117.282);
      ctx.lineTo(288.305, 114.267);
      ctx.lineTo(289.936, 147.65);
      ctx.bezierCurveTo(288.132, 148.72, 288.698, 149.326, 287.374, 151.12);
      ctx.bezierCurveTo(282.066, 158.308, 281.881, 185.275, 289.069, 190.583);
      ctx.bezierCurveTo(290.314, 191.503, 293.761, 194.552, 295.142, 195.068);
      ctx.lineTo(298.216, 224.681);
      ctx.lineTo(264.62, 227.696);
      ctx.lineTo(263.614, 190.556);
      ctx.bezierCurveTo(265.435, 189.484, 265.07, 190.401, 266.404, 188.594);
      ctx.bezierCurveTo(271.712, 181.407, 269.516, 156.033, 262.329, 150.725);
      ctx.bezierCurveTo(261.121, 147.822, 257.245, 146.406, 255.848, 145.889);
      ctx.lineTo(254.709, 117.282);
      ctx.closePath();
      ctx.fill();

      // Three horizontal bars
      ctx.beginPath();
      ctx.moveTo(486, 66);
      ctx.lineTo(374.5, 66);
      ctx.bezierCurveTo(346.5, 68.4, 337.167, 93, 336, 105);
      ctx.lineTo(336, 122);
      ctx.lineTo(446, 122);
      ctx.bezierCurveTo(475.6, 120, 485, 96.1667, 486, 83.5);
      ctx.lineTo(486, 66);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(486, 130);
      ctx.lineTo(374.5, 130);
      ctx.bezierCurveTo(346.5, 132.4, 337.167, 157, 336, 169);
      ctx.lineTo(336, 186);
      ctx.lineTo(446, 186);
      ctx.bezierCurveTo(475.6, 184, 485, 160.167, 486, 147.5);
      ctx.lineTo(486, 130);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(486, 194);
      ctx.lineTo(374.5, 194);
      ctx.bezierCurveTo(346.5, 196.4, 337.167, 221, 336, 233);
      ctx.lineTo(336, 250);
      ctx.lineTo(446, 250);
      ctx.bezierCurveTo(475.6, 248, 485, 224.167, 486, 211.5);
      ctx.lineTo(486, 194);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      return svgScale;
    }

    function createParticle(scale: number) {
      if (!ctx || !canvas || !textImageData) return null;

      const data = textImageData.data;

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1.5 + 0.5,
            color: "#3F59A8",
            scatteredColor: getRandomColor(),
            life: Math.random() * 100 + 50,
          };
        }
      }

      return null;
    }

    function getRandomColor() {
      const colors = ["#5A7AC5", "#8AA0D4", "#2D4A9D", "#1A3A8F", "#6B8CD6"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function createInitialParticles(scale: number) {
      const baseParticleCount = 8000; // Increased for higher density
      const particleCount = Math.floor(
        baseParticleCount *
          Math.sqrt((canvas!.width * canvas!.height) / (1920 * 1080))
      );
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(scale);
        if (particle) particles.push(particle);
      }
    }

    let animationFrameId: number;

    function animate(scale: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const { x: mouseX, y: mouseY } = mousePositionRef.current;
      const maxDistance = 240;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (
          distance < maxDistance &&
          (isTouchingRef.current || !("ontouchstart" in window))
        ) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force * 60;
          const moveY = Math.sin(angle) * force * 60;
          p.x = p.baseX - moveX;
          p.y = p.baseY - moveY;

          ctx.fillStyle = p.scatteredColor;
        } else {
          p.x += (p.baseX - p.x) * 0.1;
          p.y += (p.baseY - p.y) * 0.1;
          ctx.fillStyle = p.color;
        }

        ctx.fillRect(p.x, p.y, p.size, p.size);

        p.life--;
        if (p.life <= 0) {
          const newParticle = createParticle(scale);
          if (newParticle) {
            particles[i] = newParticle;
          } else {
            particles.splice(i, 1);
            i--;
          }
        }
      }

      const baseParticleCount = 8000;
      const targetParticleCount = Math.floor(
        baseParticleCount *
          Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
      );
      while (particles.length < targetParticleCount) {
        const newParticle = createParticle(scale);
        if (newParticle) particles.push(newParticle);
      }

      animationFrameId = requestAnimationFrame(() => animate(scale));
    }

    const scale = createSvgImage();
    createInitialParticles(scale);
    animate(scale);

    const handleResize = () => {
      updateCanvasSize();
      const newScale = createSvgImage();
      particles = [];
      createInitialParticles(newScale);
    };

    const handleMove = (x: number, y: number) => {
      mousePositionRef.current = { x, y };
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = () => {
      isTouchingRef.current = true;
    };

    const handleTouchEnd = () => {
      isTouchingRef.current = false;
      mousePositionRef.current = { x: 0, y: 0 };
    };

    const handleMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mousePositionRef.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted, isMobile]);

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black">
      {isMounted ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full absolute top-0 left-0 touch-none"
          aria-label="Interactive particle effect with blue SVG design"
        />
      ) : (
        <div className="w-full h-full absolute top-0 left-0 bg-black" />
      )}
      <div className="absolute bottom-[100px] text-center z-10">
        <p className="font-mono text-gray-400 text-xs sm:text-base md:text-sm">
          <span className="text-gray-500 text-xs mt-2.5 inline-block">
            Move your cursor to interact with the particles
          </span>
        </p>
      </div>
    </div>
  );
}
