const { app, BrowserWindow } = require('electron')

const os = require('os');

if (os.platform() === 'darwin') {
    module.exports = require('@abandonware/noble');
} else {
    module.exports = require('noble-uwp');
}

const noble = require('@abandonware/noble');

noble.on('stateChange', async (state) => {
  if (state === 'poweredOn') {
    console.log('State powered on');
    await noble.startScanningAsync([], false);
  }
});

noble.on('discover', async (peripheral) => {
  console.log(`${peripheral.address} ${peripheral.advertisement.localName}`);
});


function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
