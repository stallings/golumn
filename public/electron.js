const electron = require('electron');
const parseArgs = require('minimist');
const papaparse = require('papaparse');
const fs = require('fs');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;

function parseCsv(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');

  return(papaparse.parse(data).data);
}

function createWindow() {
  mainWindow = new BrowserWindow({width: 900, height: 680});
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

const args = parseArgs(process.argv.slice(1));

if (args.csv) {
	console.log('You want to view a csv!!');
  global.data = parseCsv(args.csv);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
