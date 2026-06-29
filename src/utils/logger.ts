import winston from 'winston';
import fs from 'fs';
import path from 'path';

const isVercel = !!process.env['VERCEL'];
const logDir = isVercel ? '/tmp/logs' : 'logs';

if (!isVercel && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
];

if (!isVercel) {
  transports.push(new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }));
  transports.push(new winston.transports.File({ filename: path.join(logDir, 'audit.log') }));
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'glastor-api' },
  transports
});

if (process.env['NODE_ENV'] !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;
