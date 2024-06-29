const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

async function createLoggerWithChalk() {
  const chalk = await import('chalk');

  const emojiFormat = printf((info) => {
    let emoji;
    switch (info.level) {
      case 'info':
        emoji = '✅';
        break;
      case 'warn':
        emoji = '⚠️';
        break;
      case 'error':
        emoji = '❌';
        break;
      case 'debug':
        emoji = '🐛';
        break;
      default:
        emoji = '🔍';
    }

    let colorizer;
    switch (info.level) {
      case 'info':
        colorizer = chalk.default.hex('#22ff00'); // light blue
        break;
      case 'warn':
        colorizer = chalk.default.hex('#FFD700'); // gold
        break;
      case 'error':
        colorizer = chalk.default.hex('#FF6347'); // light corals
        break;
      case 'debug':
        colorizer = chalk.default.hex('#98FB98'); // pale green
        break;
      default:
        colorizer = chalk.default.hex('#D3D3D3'); // light gray
    }

    return colorizer(
      `${info.timestamp} [${info.level.toUpperCase()}] ${emoji}: ${info.message}`,
    );
  });

  const logger = createLogger({
    level: 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), emojiFormat),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'app.log',
        format: combine(timestamp(), emojiFormat),
      }),
    ],
  });

  return logger;
}

module.exports = createLoggerWithChalk();
