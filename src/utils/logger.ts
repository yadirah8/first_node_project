import winston from "winston";

const Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    winston.format.align(),
    winston.format.json(),
    winston.format.printf((info) => `${[info.timestamp]}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

export default Logger;
