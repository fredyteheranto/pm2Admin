// Modules to control application life and create native browser window
const {
	app,
	BrowserWindow,
	Menu,
	protocol,
	ipcMain
} = require('electron');
const log = require('electron-log');




// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
//autoUpdater.logger = log;
//autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');


function createWindow() {

	mainWindow = new BrowserWindow({
		width: 1200,
		height: 768,
		resizable: true,
		icon: __dirname + '/icon.icns',
	})
	mainWindow.setMenu(null);
	Menu.setApplicationMenu(null)

	// and load the index.html of the app.
	mainWindow.loadURL(`file://${__dirname}/index.html`);

	// Open the DevTools.
	//mainWindow.webContents.openDevTools()

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		mainWindow = null
	})

	return mainWindow;
}

function sendStatusToWindow(text) {
	log.info(text);
	mainWindow.webContents.send('message', text);
}




/*// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//autoUpdater.on('checking-for-update', () => {
	sendStatusToWindow('Checking for update...');
})
//autoUpdater.on('update-available', (info) => {
	sendStatusToWindow('Update available.');
})
//autoUpdater.on('update-not-available', (info) => {
	sendStatusToWindow('Update not available.');
})
//autoUpdater.on('error', (err) => {
	sendStatusToWindow('Error in auto-updater. ' + err);
})
//autoUpdater.on('download-progress', (progressObj) => {
	let log_message = "Download speed: " + progressObj.bytesPerSecond;
	log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
	log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
	sendStatusToWindow(log_message);
})
//autoUpdater.on('update-downloaded', (ev, info) => {
	// Wait 5 seconds, then quit and install
	// In your application, you don't need to wait 5 seconds.
	// You could call //autoUpdater.quitAndInstall(); immediately
	setTimeout(function () {
		//autoUpdater.quitAndInstall();
	}, 5000)
}) */

app.on('ready', function () {
	createWindow();

	//autoUpdater.checkForUpdates();
})





app.on('browser-window-created', function (e, window) {
	window.setMenu(null);
})
// Quit when all windows are closed.
app.on('window-all-closed', () => {
	app.quit();
});

app.on('ready', function () {
	////autoUpdater.checkForUpdatesAndNotify();
});

app.on('activate', function () {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow()
	}
})
ipcMain.on("quitAndInstall", (event, arg) => {
	//autoUpdater.quitAndInstall();
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.