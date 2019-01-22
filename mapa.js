// Modules to control application life and create native browser window
const {
	app,
	BrowserWindow,
	Menu,
	protocol,
	ipcMain
} = require('electron');
const log = require('electron-log');
const {
	autoUpdater
} = require("electron-updater");



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');


function createWindow() {
	// Create the browser window.
	//Para windows cambiar extencion icns por ico
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		resizable: true,
		transparent: false,
		icon: __dirname + '/icon.icns',


	})
	mainWindow.setMenu(null);
	Menu.setApplicationMenu(null)

	// and load the index.html of the app.
	mainWindow.loadFile('index.html')

	// Open the DevTools.
	//mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null
	})
}

function sendStatusToWindow(text) {
	log.info(text);
	mainWindow.webContents.send('message', text);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
autoUpdater.on('checking-for-update', () => {
	sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
	sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (ev, info) => {
	sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
	console.log('okokoko', ev, err)
	sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (ev, progressObj) => {
	sendStatusToWindow('Download progress...');
})
autoUpdater.on('update-downloaded', (ev, info) => {
	sendStatusToWindow('Update downloaded; will install in 5 seconds');
});

app.on('ready', function () {
	createWindow();
	//autoUpdater.checkForUpdates();
})
autoUpdater.on('update-downloaded', (ev, info) => {
	// Wait 5 seconds, then quit and install
	// In your application, you don't need to wait 5 seconds.
	// You could call autoUpdater.quitAndInstall(); immediately
	setTimeout(function () {
		autoUpdater.quitAndInstall();
	}, 5000)
})

app.on('ready', function () {
	autoUpdater.checkForUpdates();
});



app.on('browser-window-created', function (e, window) {
	window.setMenu(null);
})
// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})
ipcMain.on("quitAndInstall", (event, arg) => {
	autoUpdater.quitAndInstall();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.