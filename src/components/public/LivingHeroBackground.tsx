'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LivingHeroBackgroundProps {
  imageUrl: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: string;
}

interface NodePoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  connections: number[];
}

export default function LivingHeroBackground({ imageUrl }: LivingHeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation: Sun flares, golden embers, and digital connection nodes
  useEffect(() => {
    if (!isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Golden Atmospheric Embers & Sunlight Dust
    const particles: Particle[] = [];
    const maxParticles = 45;

    const createParticle = (): Particle => {
      // Spawn mainly from the central sunset horizon
      const sunX = width * 0.55 + (Math.random() - 0.5) * 160;
      const sunY = height * 0.45 + (Math.random() - 0.5) * 120;
      return {
        x: Math.random() > 0.4 ? sunX : Math.random() * width,
        y: Math.random() > 0.4 ? sunY : Math.random() * height,
        vx: (Math.random() - 0.4) * 0.6,
        vy: -0.3 - Math.random() * 0.5,
        radius: 1 + Math.random() * 2.2,
        alpha: 0,
        maxAlpha: 0.2 + Math.random() * 0.6,
        life: 0,
        maxLife: 150 + Math.random() * 200,
        color: Math.random() > 0.3 ? '#ff9a00' : '#ffd066',
      };
    };

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle());
    }

    // 2. Interactive Digital Connection Mesh (positioned over the AI/holographic head on the right)
    const nodes: NodePoint[] = [];
    const nodeCount = 18;

    for (let i = 0; i < nodeCount; i++) {
      const offsetX = (Math.random() - 0.5) * (width * 0.18);
      const offsetY = (Math.random() - 0.5) * (height * 0.22);
      const baseX = width * 0.76 + offsetX;
      const baseY = height * 0.68 + offsetY;
      nodes.push({
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [],
      });
    }

    // Connect nearby nodes
    nodes.forEach((node, idx) => {
      nodes.forEach((other, otherIdx) => {
        if (idx !== otherIdx) {
          const dist = Math.hypot(node.baseX - other.baseX, node.baseY - other.baseY);
          if (dist < 75 && !node.connections.includes(otherIdx)) {
            node.connections.push(otherIdx);
          }
        }
      });
    });

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // --- A. Breathing Sunburst Rays (Center Horizon) ---
      const sunCenterX = width * 0.55 + mousePos.x * 12;
      const sunCenterY = height * 0.44 + mousePos.y * 8;
      const pulse = Math.sin(tick * 0.02) * 20;

      const sunGlow = ctx.createRadialGradient(
        sunCenterX,
        sunCenterY,
        10,
        sunCenterX,
        sunCenterY,
        280 + pulse
      );
      sunGlow.addColorStop(0, 'rgba(255, 200, 80, 0.35)');
      sunGlow.addColorStop(0.3, 'rgba(255, 138, 0, 0.18)');
      sunGlow.addColorStop(0.7, 'rgba(255, 22, 118, 0.06)');
      sunGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, 300 + pulse, 0, Math.PI * 2);
      ctx.fill();

      // Rotating subtle light rays
      ctx.save();
      ctx.translate(sunCenterX, sunCenterY);
      ctx.rotate(tick * 0.001);
      for (let i = 0; i < 6; i++) {
        ctx.rotate((Math.PI * 2) / 6);
        ctx.fillStyle = 'rgba(255, 180, 50, 0.025)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-40, 400);
        ctx.lineTo(40, 400);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      // --- B. Studio Rim Light Pulsing (Top Right) ---
      const studioX = width * 0.82;
      const studioY = height * 0.18;
      const studioPulse = Math.sin(tick * 0.035) * 15;

      const studioGlow = ctx.createRadialGradient(
        studioX,
        studioY,
        5,
        studioX,
        studioY,
        180 + studioPulse
      );
      studioGlow.addColorStop(0, 'rgba(34, 183, 201, 0.22)');
      studioGlow.addColorStop(0.5, 'rgba(255, 22, 118, 0.08)');
      studioGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = studioGlow;
      ctx.beginPath();
      ctx.arc(studioX, studioY, 200, 0, Math.PI * 2);
      ctx.fill();

      // --- C. Golden Sea Shimmer (Bottom Left at Sunset Beach) ---
      const seaX = width * 0.28;
      const seaY = height * 0.82;
      const seaShimmer = Math.sin(tick * 0.04) * 0.06 + 0.12;

      const seaGlow = ctx.createRadialGradient(seaX, seaY, 10, seaX, seaY, 140);
      seaGlow.addColorStop(0, `rgba(255, 180, 40, ${seaShimmer})`);
      seaGlow.addColorStop(1, 'transparent');

      ctx.fillStyle = seaGlow;
      ctx.beginPath();
      ctx.arc(seaX, seaY, 140, 0, Math.PI * 2);
      ctx.fill();

      // --- D. Digital Connection Mesh (Bottom Right Hologram) ---
      ctx.save();
      nodes.forEach((node) => {
        // Micro drift
        node.x = node.baseX + Math.sin(tick * 0.02 + node.vx * 10) * 8 + mousePos.x * 6;
        node.y = node.baseY + Math.cos(tick * 0.02 + node.vy * 10) * 8 + mousePos.y * 6;

        // Draw connections
        node.connections.forEach((targetIdx) => {
          const target = nodes[targetIdx];
          if (!target) return;
          const dist = Math.hypot(node.x - target.x, node.y - target.y);
          const alpha = Math.max(0, 1 - dist / 90) * 0.35;

          ctx.strokeStyle = `rgba(34, 183, 201, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.stroke();
        });

        // Draw node points
        const nodeGlowAlpha = (Math.sin(tick * 0.05 + node.baseX) + 1) * 0.4 + 0.2;
        ctx.fillStyle = `rgba(34, 183, 201, ${nodeGlowAlpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // --- E. Atmospheric Golden Embers / Dust Motes ---
      particles.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Fade in and out
        if (p.life < 40) {
          p.alpha = (p.life / 40) * p.maxAlpha;
        } else if (p.life > p.maxLife - 40) {
          p.alpha = ((p.maxLife - p.life) / 40) * p.maxAlpha;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Respawn when dead
        if (p.life >= p.maxLife || p.y < -10 || p.x < 0 || p.x > width) {
          Object.assign(p, createParticle());
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying, mousePos]);

  // Dynamic parallax transforms for 2.5D depth
  const bgTransform = `scale(1.06) translate(${mousePos.x * -14}px, ${mousePos.y * -10}px)`;

  return (
    <div className="living-hero-container" ref={containerRef}>
      {/* 1. Base Image Layer with Continuous Living Motion & Mouse 2.5D Tilt */}
      <div
        className="living-hero-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
          transform: isPlaying ? bgTransform : 'scale(1.0)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      {/* 2. Interactive Canvas Layer: Sunbeams, Embers, Studio Glow, Neural Network */}
      <canvas ref={canvasRef} className="living-hero-canvas" />

      {/* 3. Gradient Lighting & Vignette Overlay */}
      <div className="living-hero-overlay" />

      {/* 4. Subtle Motion Control (Discreet Accessibility Button) */}
      <button
        type="button"
        onClick={() => setIsPlaying(!isPlaying)}
        className="living-hero-toggle"
        title={isPlaying ? 'Pause background animation' : 'Resume background animation'}
        aria-label={isPlaying ? 'Pause background animation' : 'Resume background animation'}
      >
        <span className="motion-indicator">{isPlaying ? '● LIVE' : '○ PAUSED'}</span>
      </button>
    </div>
  );
}
