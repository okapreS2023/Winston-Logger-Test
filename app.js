const express = require("express");
const winston = require("winston");
const app = express();

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

app.get("/", (req, res) => {
  // For loop with no statements
  const start1 = Date.now();
  for (let i = 0; i < 1000000; i++) {}
  const end1 = Date.now();
  const time1 = end1 - start1;

  // For loop with console.log
  const start2 = Date.now();
  for (let i = 0; i < 1000000; i++) {
    console.log(Date.now(), i);
  }
  const end2 = Date.now();
  const time2 = end2 - start2;

  // For loop with logger.info
  const start3 = Date.now();
  for (let i = 0; i < 1000000; i++) {
    logger.info(i);
  }
  const end3 = Date.now();
  const time3 = end3 - start3;

  res.send(`
    <h1>For Loop Performance Test</h1>
    <p>For loop with no statements: ${time1}ms</p>
    <p>For loop with console.log: ${time2}ms</p>
    <p>For loop with logger.info: ${time3}ms</p>
  `);
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000...");
});
