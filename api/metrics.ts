// Vercel Serverless Function: /api/metrics
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Variables persistentes en memoria de la función (simulación)
let startTime = Date.now() - 1000 * 60 * 60 * 24 * 15; // 15 días de uptime
let lastRequests = 4200;
let lastCPU = 22.5;
let lastRAM = 8.2;

function getUptime() {
  const now = Date.now();
  const diff = now - startTime;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${days}d ${hours}h ${mins}m`;
}

function nextValue(prev: number, min: number, max: number, step: number) {
  let next = prev + (Math.random() - 0.5) * step;
  if (next < min) next = min;
  if (next > max) next = max;
  return Number(next.toFixed(1));
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Simulación realista: los valores varían suavemente
  lastRequests = nextValue(lastRequests, 2000, 8000, 200);
  lastCPU = nextValue(lastCPU, 8, 85, 5);
  lastRAM = nextValue(lastRAM, 2, 32, 1);

  res.status(200).json({
    uptime: getUptime(),
    requests: (lastRequests / 1000).toFixed(1) + 'k/s',
    cpu: lastCPU.toFixed(1),
    ram: lastRAM.toFixed(1)
  });
}
