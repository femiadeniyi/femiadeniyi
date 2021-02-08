import {app, BrowserWindow, dialog, Menu} from 'electron'
import {importConfig} from "./helpers";

async function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            devTools: true,
            nodeIntegration: true,
        },
    })
    const config = await importConfig()

    await win.loadURL(config.tests.url)
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
