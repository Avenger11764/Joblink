import React, { useRef, useEffect } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      z: number;
      ox: number; 
      oy: number;
      oz: number;
      vx: number;
      vy: number;
      vz: number;
      color: string;
      size: number;
    }

    const particles: Particle[] = [];
    const particleCount = 80;
    const fov = 300; 

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = Math.random() * fov * 2 - fov;
      
      const colors = ['rgba(99, 87, 137, 0.45)', 'rgba(155, 142, 196, 0.55)', 'rgba(100, 85, 144, 0.35)'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x, y, z,
        ox: x, oy: y, oz: z,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        vz: (Math.random() - 0.5) * 0.9,
        color,
        size: Math.random() * 4 + 2.5
      });
    }

    let angleX = 0.0022;
    let angleY = 0.003;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected: { sx: number; sy: number; size: number; alpha: number; p: Particle }[] = [];

      particles.forEach((p) => {
        
        p.ox += p.vx;
        p.oy += p.vy;
        p.oz += p.vz;

        
        if (Math.abs(p.ox) > width / 1.5) p.vx *= -1;
        if (Math.abs(p.oy) > height / 1.5) p.vy *= -1;
        if (Math.abs(p.oz) > fov) p.vz *= -1;

        
        let oy1 = p.oy * cosX - p.oz * sinX;
        let oz1 = p.oz * cosX + p.oy * sinX;

        let ox2 = p.ox * cosY - oz1 * sinY;
        let oz2 = p.oz * cosY + p.ox * sinY;

        p.ox = ox2;
        p.oy = oy1;
        p.oz = oz2;

        
        if (mouse.active) {
          const dx = (p.x + width / 2) - mouse.x;
          const dy = (p.y + height / 2) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            const force = (220 - dist) * 0.04;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        
        p.x += (p.ox - p.x) * 0.04;
        p.y += (p.oy - p.y) * 0.04;

        
        const scale = fov / (fov + p.z + 200);
        const sx = width / 2 + p.x * scale;
        const sy = height / 2 + p.y * scale;

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          const alpha = Math.max(0.15, Math.min(0.85, scale * 0.8));
          projected.push({
            sx,
            sy,
            size: p.size * scale,
            alpha,
            p
          });
        }
      });

      const maxDist = 165; 

      
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const pi = projected[i];
          const pj = projected[j];
          const dx1 = pi.sx - pj.sx;
          const dy1 = pi.sy - pj.sy;
          const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

          if (dist1 < maxDist) {
            
            const alpha1 = (1 - dist1 / maxDist) * 0.35 * Math.min(pi.alpha, pj.alpha);
            ctx.strokeStyle = `rgba(99, 87, 137, ${alpha1})`;
            ctx.lineWidth = 1.6 * (1 - dist1 / maxDist);
            ctx.beginPath();
            ctx.moveTo(pi.sx, pi.sy);
            ctx.lineTo(pj.sx, pj.sy);
            ctx.stroke();

            
            for (let k = j + 1; k < projected.length; k++) {
              const pk = projected[k];
              const dx2 = pi.sx - pk.sx;
              const dy2 = pi.sy - pk.sy;
              const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

              const dx3 = pj.sx - pk.sx;
              const dy3 = pj.sy - pk.sy;
              const dist3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);

              if (dist2 < maxDist && dist3 < maxDist) {
                
                const alphaFace = (1 - (dist1 + dist2 + dist3) / (maxDist * 3)) * 0.12 * Math.min(pi.alpha, pj.alpha, pk.alpha);
                ctx.fillStyle = `rgba(155, 142, 196, ${alphaFace})`;
                ctx.beginPath();
                ctx.moveTo(pi.sx, pi.sy);
                ctx.lineTo(pj.sx, pj.sy);
                ctx.lineTo(pk.sx, pk.sy);
                ctx.closePath();
                ctx.fill();
              }
            }
          }
        }
      }

      
      if (mouse.active) {
        projected.forEach((pi) => {
          const dx = pi.sx - mouse.x;
          const dy = pi.sy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.4 * pi.alpha;
            ctx.strokeStyle = `rgba(99, 87, 137, ${alpha})`;
            ctx.lineWidth = 2.0 * (1 - dist / 180);
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(pi.sx, pi.sy);
            ctx.stroke();
          }
        });
      }

      
      projected.forEach((pi) => {
        ctx.fillStyle = pi.p.color;
        ctx.globalAlpha = pi.alpha;
        ctx.beginPath();
        ctx.arc(pi.sx, pi.sy, pi.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1]" 
      style={{ opacity: 0.95 }}
    />
  );
}
