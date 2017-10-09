'use strict'

const { app, BrowserWindow } = require('electron')

//console.dir(app)

app.on('before-quit', () => {
	console.log('Saliendo...')
})

app.on('ready', () => {
    let win = new BrowserWindow()

    win.on('closed', () => {
        win = null
        app.quit()
    })
})

//app.quit()