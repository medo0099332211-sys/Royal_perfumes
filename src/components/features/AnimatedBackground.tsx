import { useEffect, useRef } from "react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

interface FloatingBottle {
  id: number;
  src: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotate: number;
  rotateDir: number;
}

const BOTTLES: FloatingBottle[] = [
  { id: 1, src: product1, x: 5,  y: 10, size: 80,  duration: 18, delay: 0,    opacity: 0.06, rotate: -12, rotateDir: 1  },
  { id: 2, src: product2, x: 88, y: 5,  size: 65,  duration: 22, delay: 3,    opacity: 0.05, rotate: 15,  rotateDir: -1 },
  { id: 3, src: product3, x: 70, y: 60, size: 90,  duration: 20, delay: 6,    opacity: 0.07, rotate: -8,  rotateDir: 1  },
  { id: 4, src: product1, x: 15, y: 70, size: 55,  duration: 25, delay: 9,    opacity: 0.04, rotate: 20,  rotateDir: -1 },
  { id: 5, src: product2, x: 50, y: 15, size: 70,  duration: 16, delay: 4,    opacity: 0.05, rotate: -5,  rotateDir: 1  },
  { id: 6, src: product3, x: 90, y: 80, size: 60,  duration: 23, delay: 12,   opacity: 0.04, rotate: 10,  rotateDir: -1 },
  { id: 7, src: product1, x: 35, y: 85, size: 50,  duration: 19, delay: 7,    opacity: 0.035,rotate: -18, rotateDir: 1  },
  { id: 8, src: product2, x: 60, y: 40, size: 45,  duration: 28, delay: 15,   opacity: 0.03, rotate: 8,   rotateDir: -1 },
];

const ORBS = [
  { x: 15, y: 20, size: 350, blur: 120, delay: 0,  duration: 12 },
  { x: 75, y: 70, size: 280, blur: 100, delay: 5,  duration: 15 },
  { x: 50, y: 50, size: 200, blur: 80,  delay: 8,  duration: 10 },
  { x: 85, y: 15, size: 220, blur: 90,  delay: 3,  duration: 18 },
];

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let t = 0;
    const bottles = containerRef.current?.querySelectorAll<HTMLElement>(".floating-bottle");
    const orbs = containerRef.current?.querySelectorAll<HTMLElement>(".glow-orb");

    const animate = () => {
      t += 0.003;
      bottles?.forEach((el, i) => {
        const bottle = BOTTLES[i];
        const yOffset = Math.sin(t + bottle.delay * 0.4) * 18;
        const xOffset = Math.cos(t * 0.6 + bottle.delay * 0.3) * 8;
        const rotOffset = Math.sin(t * 0.5 + bottle.delay * 0.2) * 4 * bottle.rotateDir;
        el.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${bottle.rotate + rotOffset}deg)`;
      });
      orbs?.forEach((el, i) => {
        const orb = ORBS[i];
        const scale = 1 + Math.sin(t * 0.7 + orb.delay * 0.5) * 0.15;
        const opacity = 0.03 + Math.sin(t * 0.5 + orb.delay) * 0.02;
        el.style.transform = `scale(${scale})`;
        el.style.opacity = String(opacity);
      });
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Floating perfume bottles */}
      {BOTTLES.map((bottle) => (
        <div
          key={bottle.id}
          className="floating-bottle absolute will-change-transform"
          style={{
            left: `${bottle.x}%`,
            top: `${bottle.y}%`,
            width: bottle.size,
            height: bottle.size * 1.35,
            opacity: bottle.opacity,
            transform: `rotate(${bottle.rotate}deg)`,
            transition: "none",
          }}
        >
          <img
            src={bottle.src}
            alt=""
            className="w-full h-full object-cover rounded-lg"
            style={{ filter: "sepia(0.3) saturate(0.6) brightness(0.5)" }}
          />
          {/* Gold shimmer overlay */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              background: "linear-gradient(135deg, transparent 40%, rgba(212,175,55,0.15) 60%, transparent 80%)",
              backgroundSize: "200% 200%",
              animation: `shimmer ${bottle.duration * 0.5}s linear infinite`,
            }}
          />
        </div>
      ))}

      {/* Glowing orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="glow-orb absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 50%, transparent 70%)",
            filter: `blur(${orb.blur}px)`,
            transform: "translate(-50%, -50%)",
            opacity: 0.04,
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(6,6,6,0.6) 100%)",
        }}
      />
    </div>
  );
}
