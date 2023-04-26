/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		transparent: true,
		frame: false,
		webPreferences: {
			// devTools: 
			preload: path.join(__dirname, 'preload.ts')
		}
	});
	ipcMain.handle('ping', () => 'pong');
	win.setMenu(null);
	if (isDev) {
		// If we are in development mode we load content from localhost server - vite
		// and open the developer tools
		win.loadURL('http://localhost:5173');
		win.webContents.openDevTools();
	} else {
		// In all other cases, load the index.html file from the dist folder
		win.loadURL(`file://${path.join(__dirname, '..', 'dist', 'index.html')}`);
	}
};

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
