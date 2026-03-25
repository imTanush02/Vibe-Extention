import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SimpleClock = ({ accentColor }) => {
  const [time, setTime] = useState(new Date());
  const canvasRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Draw analog clock on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = 180;
    const center = size / 2;
    const radius = center - 10;

    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);

    // Hour markers
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const isQuarter = i % 3 === 0;
      const innerR = radius - (isQuarter ? 16 : 10);
      const outerR = radius - 4;
      ctx.beginPath();
      ctx.moveTo(center + innerR * Math.cos(angle), center + innerR * Math.sin(angle));
      ctx.lineTo(center + outerR * Math.cos(angle), center + outerR * Math.sin(angle));
      ctx.strokeStyle = isQuarter ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)";
      ctx.lineWidth = isQuarter ? 3 : 1.5;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    // Hour hand
    const hourAngle = ((hours + minutes / 60) * 30 - 90) * (Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center + (radius * 0.5) * Math.cos(hourAngle), center + (radius * 0.5) * Math.sin(hourAngle));
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();

    // Minute hand
    const minAngle = ((minutes + seconds / 60) * 6 - 90) * (Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center + (radius * 0.7) * Math.cos(minAngle), center + (radius * 0.7) * Math.sin(minAngle));
    ctx.strokeStyle = "rgba(255,255,255,0.8)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke(); 

    // Second hand
    const secAngle = (seconds * 6 - 90) * (Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center + (radius * 0.75) * Math.cos(secAngle), center + (radius * 0.75) * Math.sin(secAngle));
    ctx.strokeStyle = accentColor || "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(center, center, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fill();
  }, [time, accentColor]);

  // Scalloped border SVG path
  const scallopPath = () => {
    const cx = 110, cy = 110, r = 95;
    const scallops = 16;
    const depth = 8;
    let d = "";
    for (let i = 0; i < scallops; i++) {
      const a1 = (i / scallops) * Math.PI * 2 - Math.PI / 2;
      const a2 = ((i + 1) / scallops) * Math.PI * 2 - Math.PI / 2;
      const aMid = (a1 + a2) / 2;
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const cpx = cx + (r + depth) * Math.cos(aMid);
      const cpy = cy + (r + depth) * Math.sin(aMid);
      const x2 = cx + r * Math.cos(a2);
      const y2 = cy + r * Math.sin(a2);
      if (i === 0) d += `M ${x1} ${y1} `;
      d += `Q ${cpx} ${cpy} ${x2} ${y2} `;
    }
    d += "Z";
    return d;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex items-center justify-center"
    >
      {/* Scalloped border */}
      <svg width="220" height="220" viewBox="0 0 220 220" className="absolute">
        <path
          d={scallopPath()}
          fill="rgba(0,0,0,0.15)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      </svg>
      {/* Clock face */}
      <canvas ref={canvasRef} className="relative z-10" style={{ width: 180, height: 180 }} />
    </motion.div>
  );
};

export default SimpleClock;
