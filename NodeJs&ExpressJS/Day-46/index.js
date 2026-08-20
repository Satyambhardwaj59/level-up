console.log("Start");

setTimeout(() => console.log("Timer"), 0)

console.log("End");


console.log(global);
console.log(globalThis);

console.log(process);

console.log(process.version);
console.log(process.platform);
console.log(process.arch);
console.log(process.pid);
console.log(process.cwd());


process.env
process.argv
process.exit()


const path = require('path');
const fs = require('fs');

// Safely read a config file located in the same directory
const configPath = path.join(__dirname, 'config.json');
const configData = fs.readFileSync(configPath, 'utf8');

console.log(configData)


const os = require('os');

const systemInfo = {
  nodeVersion: process.version,
  platform: process.platform,
  architecture: process.arch,
  processID: process.pid,
  workingDir: process.cwd(),
  cpuCores: os.cpus().length,
  totalMemory: `${Math.round(os.totalmem() / (1024 * 1024))} MB`,
  freeMemory: `${Math.round(os.freemem() / (1024 * 1024))} MB`
};

console.log(`
╔══════════════════════════════╗
║      SYSTEM INFORMATION      ║
╚══════════════════════════════╝

Node Version : ${systemInfo.nodeVersion}
Platform     : ${systemInfo.platform}
Architecture : ${systemInfo.architecture}
Process ID   : ${systemInfo.processID}
Working Dir  : ${systemInfo.workingDir}
CPU Cores    : ${systemInfo.cpuCores}
Total Memory : ${systemInfo.totalMemory}
Free Memory  : ${systemInfo.freeMemory}
`);



console.log(os.platform());
console.log(os.arch());
console.log(os.cpus().length);
console.log(os.totalmem());
console.log(os.freemem());
console.log(process.argv);