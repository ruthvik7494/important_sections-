"use client"

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  friction: number;
  spring: number;
  mouseX: number;
  mouseY: number;
  distance: number;
  ease: number;
}

interface PixelShatterTextProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  density?: number;
  mouseRadius?: number;
}

const PixelShatterText: React.FC<PixelShatterTextProps> = ({
  text,
  fontSize = 80,
  fontFamily = "Syncopate, sans-serif",
  color = "#ffffff",
  density = 1,
  mouseRadius = 100,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const initParticles = (logicalWidth: number, logicalHeight: number) => {
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      if (logicalWidth === 0 || logicalHeight === 0) return;

      ctx.fillStyle = "white";
      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      const lines = text.split("<br />");
      const lineHeight = fontSize * 1.1;
      const totalHeight = lines.length * lineHeight;
      const startY = (logicalHeight - totalHeight) / 2 + lineHeight / 2;

      lines.forEach((line, i) => {
        ctx.fillText(line, logicalWidth / 2, startY + i * lineHeight);
      });

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const newParticles: Particle[] = [];
      const dpr = window.devicePixelRatio || 1;
      const step = Math.max(1, Math.floor(4 / (density * dpr)));

      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const index = (y * canvas.width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            newParticles.push({
              x: (x / dpr) + (Math.random() - 0.5) * 20,
              y: (y / dpr) + (Math.random() - 0.5) * 20,
              originX: x / dpr,
              originY: y / dpr,
              vx: 0,
              vy: 0,
              friction: 0.9,
              spring: 0.04,
              mouseX: 0,
              mouseY: 0,
              distance: 0,
              ease: 0.1,
            });
          }
        }
      }
      particles.current = newParticles;
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
    };

    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initParticles(rect.width, rect.height);
      }
    };

    if ("fonts" in document) {
      (document as any).fonts.ready.then(updateSize);
    } else {
      setTimeout(updateSize, 500);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.current = { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
    };

    const animate = () => {
      if (!isVisibleRef.current) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = color;

      particles.current.forEach((p) => {
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const distSq = dx * dx + dy * dy;
        const radSq = mouseRadius * mouseRadius;

        if (distSq < radSq) {
          const dist = Math.sqrt(distSq);
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - dist) / mouseRadius;
          p.vx -= Math.cos(angle) * force * 15;
          p.vy -= Math.sin(angle) * force * 15;
        }

        p.vx += (p.originX - p.x) * p.spring;
        p.vy += (p.originY - p.y) * p.spring;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillRect(p.x, p.y, 2, 2);
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", updateSize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [text, fontSize, fontFamily, color, density, mouseRadius]);

  return <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />;
};

export default PixelShatterText;
