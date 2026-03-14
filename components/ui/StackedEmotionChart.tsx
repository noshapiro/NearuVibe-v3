"use client";

import { useEffect, useRef, useState } from "react";

const CHART_LAYERS = [
  {
    emotion: "Calm",
    color: "#38bdf8",
    data: [58, 62, 66, 70, 72, 70, 66, 62, 58, 54, 57, 62, 66, 70, 62, 58, 65, 70, 72, 70],
  },
  {
    emotion: "Happy",
    color: "#f59e0b",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 10, 18, 16, 8, 2, 0],
  },
  {
    emotion: "Fearful",
    color: "#a78bfa",
    data: [0, 0, 0, 0, 0, 0, 0, 2, 8, 12, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0],
  },
];

const CHART_HEIGHT = 150;
const PAD_LEFT = 8;
const PAD_RIGHT = 8;
const PAD_TOP = 14;
const PAD_BOTTOM = 24;
const DRAW_HEIGHT = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;
const CHART_BOTTOM = CHART_HEIGHT - PAD_BOTTOM;

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function catmullRomPath(
  ctx: CanvasRenderingContext2D,
  points: { x: number; y: number }[]
): void {
  const n = points.length;
  if (n < 2) return;
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(n - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }
}

export function StackedEmotionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const updateSize = () => {
      const w = canvas.offsetWidth;
      setCanvasWidth(w);
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvasWidth <= 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasWidth;
    canvas.height = CHART_HEIGHT;

    const chartWidth = canvasWidth - PAD_LEFT - PAD_RIGHT;
    const n = CHART_LAYERS[0].data.length;

    // Y for a data value v (0–100): baseline at bottom, higher v = lower y
    const yFor = (v: number) =>
      PAD_TOP + (1 - v / 100) * (CHART_HEIGHT - PAD_TOP - PAD_BOTTOM);

    const layersToDraw = CHART_LAYERS.filter(
      (l) => l.data.reduce((a, b) => Math.max(a, b), 0) > 0
    );

    for (const layer of layersToDraw) {
      const topPoints: { x: number; y: number }[] = Array.from({ length: n }, (_, i) => ({
        x: PAD_LEFT + (i / (n - 1)) * chartWidth,
        y: yFor(layer.data[i]),
      }));

      const grad = ctx.createLinearGradient(0, PAD_TOP, 0, CHART_BOTTOM);
      grad.addColorStop(0, hexToRgba(layer.color, 0.5));
      grad.addColorStop(1, hexToRgba(layer.color, 0.05));

      // Path: baseline left → actual value at left → spline through data → baseline right → close
      ctx.beginPath();
      ctx.moveTo(PAD_LEFT, CHART_BOTTOM);
      ctx.lineTo(PAD_LEFT, topPoints[0].y);
      catmullRomPath(ctx, topPoints);
      ctx.lineTo(PAD_LEFT + chartWidth, CHART_BOTTOM);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(topPoints[0].x, topPoints[0].y);
      catmullRomPath(ctx, topPoints);
      ctx.strokeStyle = layer.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [canvasWidth]);

  const visibleLayers = CHART_LAYERS.filter(
    (l) => l.data.reduce((a, b) => Math.max(a, b), 0) > 0
  );

  const timeLabels = ["0:00", "0:20", "0:40", "1:00", "1:16"];

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl border p-3.5"
      style={{
        background: "#111111",
        borderColor: "#1e1e1e",
      }}
    >
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-xs font-semibold text-t2">Combined Emotion Progress</span>
        <div className="flex items-center gap-3.5">
          {visibleLayers.map((layer) => (
            <div key={layer.emotion} className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: layer.color }}
              />
              <span className="text-[10px] text-[#666666]">{layer.emotion}</span>
            </div>
          ))}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ width: "100%", height: CHART_HEIGHT, display: "block" }}
      />
      <div className="mt-1 flex justify-between px-0">
        {timeLabels.map((label) => (
          <span
            key={label}
            className="flex-1 text-center text-[10px] text-[#555555]"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
