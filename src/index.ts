import express, { type Request, type Response } from 'express';
import os from 'os';
import cors from 'cors';

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
    <h1>Server Info</h1>
    <p><strong>Hostname:</strong> ${hostname}</p>
    <p><strong>Server IP:</strong> ${serverIp}</p>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  const hostname = os.hostname();
  const serverIp = getServerIp();
  console.log(`Running on PORT: ${PORT}, HOSTNAME: ${hostname}, IP: ${serverIp}`);
});
