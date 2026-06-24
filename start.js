const { spawn } = require('child_process');

// Turn off Node deprecation warnings from third-party libraries (spdy, needle, etc.)
process.env.NODE_OPTIONS = (process.env.NODE_OPTIONS || '') + ' --no-deprecation';

console.log("🏔️ SÖDRA Orchestrator: Initializing Full-Stack Dual-Development Server...");

// Smart production environment bypass (Cloud Run / Deployed container)
if (process.env.NODE_ENV === 'production') {
  console.log("🚀 SÖDRA Orchestrator: PRODUCTION mode detected. Booting direct SQLite+Express monolithic server on Port 3000...");
  
  const backend = spawn('npx', ['tsx', 'server.ts'], {
    env: { ...process.env, PORT: '3000' },
    shell: true,
    stdio: 'inherit'
  });

  backend.on('close', (code) => {
    process.exit(code);
  });
  
  return;
}

// Development mode: Boot dual servers to support Angular HMR + SQLite Drizzle API on port 3001
console.log("🛠️ SÖDRA Orchestrator: DEVELOPMENT mode active. Spawning DB Server + Angular proxy...");

// 1. Spawn the SQLite database + Express.js API backend on port 3001
const backend = spawn('npx', ['tsx', 'server.ts'], {
  env: { ...process.env, PORT: '3001', NODE_ENV: 'development' },
  shell: true
});

backend.stdout.on('data', (data) => {
  const line = data.toString().trim();
  if (line) console.log(`[DB-Server] ${line}`);
});

backend.stderr.on('data', (data) => {
  const line = data.toString().trim();
  if (line && !line.includes('DeprecationWarning') && !line.includes('DEP0060')) {
    console.error(`[DB-Server ERROR] ${line}`);
  }
});

// 2. Spawn the Angular frontend developer server on Port 3000 with Proxy Redirects
const frontend = spawn('npx', ['ng', 'serve', '--port', '3000', '--host', '0.0.0.0', '--disable-host-check', '--proxy-config', 'proxy.conf.json'], {
  shell: true
});

frontend.stdout.on('data', (data) => {
  const line = data.toString().trim();
  // Filter out noisy Vite websocket connection issues
  if (line && !line.includes('websocket')) {
    console.log(`[Angular-UI] ${line}`);
  }
});

frontend.stderr.on('data', (data) => {
  const line = data.toString().trim();
  if (line && !line.includes('DeprecationWarning') && !line.includes('DEP0060')) {
    console.error(`[Angular-UI ERROR] ${line}`);
  }
});

// Support termination handling
const cleanup = () => {
  console.log("\n🛑 Terminating SÖDRA full-stack processes...");
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
