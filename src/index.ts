import express, { type Request, type Response } from 'express';
import os from 'os';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

function getServerIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    if (!interfaces[name]) continue;
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

app.get('/', (req: Request, res: Response) => {
  const hostname = os.hostname();
  const serverIp = getServerIp();

  res.status(200).send(`
    <h1 style="color: #ff0000ff;">Server Info</h1>
    <p><strong>Hostname:</strong> ${hostname}</p>
    <p><strong>Server IP:</strong> ${serverIp}</p>
    <p><strong>ENV1:</strong> ${process.env.ENV1}</p>
    <p><strong>ENV2:</strong> ${process.env.ENV2}</p>
    <p><strong>ENV3:</strong> ${process.env.ENV3}</p>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  const hostname = os.hostname();
  const serverIp = getServerIp();
  console.log(process.env.ENV1);
  console.log(process.env.ENV2);
  console.log(`Running on PORT: ${PORT}, HOSTNAME: ${hostname}, IP: ${serverIp}`);
});
