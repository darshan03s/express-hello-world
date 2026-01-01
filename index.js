import express from 'express';
import os from 'os';

const PORT = 3000;
const app = express();

function getServerIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

app.get('/', (req, res) => {
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