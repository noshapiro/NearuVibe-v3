"use client";

import { useEffect, useRef } from "react";
import type { EmotionData } from "@/types";

interface EmotionChartProps {
  data: EmotionData[];
  height?: number;
}

export function EmotionChart({ data, height = 150 }: EmotionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width * dpr;
    const h = height * dpr;
    canvas.width = w;
    canvas.height = h;
    ctx.scale(dpr, dpr);

    const drawW = rect.width;
    const drawH = height;
    const n = data.length;
    const sx = n > 1 ? drawW / (n - 1) : drawW;

    ctx.clearRect(0, 0, drawW, drawH);

    for (let i = 0; i < n - 1; i++) {
      const d0 = data[i];
      const d1 = data[i + 1];
      const x0 = i * sx;
      const x1 = (i + 1) * sx;
      const y0 = drawH - (d0.combinedPct / 100) * (drawH - 20) - 10;
      const y1 = drawH - (d1.combinedPct / 100) * (drawH - 20) - 10;
      const col = d0.color || "#38bdf8";

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.lineTo(x1, drawH);
      ctx.lineTo(x0, drawH);
      ctx.closePath();
      const gr = ctx.createLinearGradient(0, 0, 0, drawH);
      gr.addColorStop(0, col + "8c");
      gr.addColorStop(1, col + "0d");
      ctx.fillStyle = gr;
      ctx.fill();
    }

    ctx.fillStyle = "rgba(85,85,85,.9)";
    ctx.font = "10px sans-serif";
    ["0:00", "0:20", "0:40", "1:00", "1:16"].forEach((l, i) => {
      ctx.fillText(l, i * (drawW / 4), drawH - 2);
    });

    return () => {
      ctx.clearRect(0, 0, drawW, drawH);
    };
  }, [data, height]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ width: "100%", height: `${height}px` }}
      width={800}
      height={height}
    />
  );
}
