'use strict'

// const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow } from 'electron'
import devtools from './devtools'
import { setupErrors } from './handle-errors'
import { setMainIpc } from './ipcMainEvents'

let win

if (process.env.NODE_ENV === 'development') {
  devtools()
}

// console.dir(app)

app.on('before-quit', () => {
  console.log('Saliendo...')
})

app.on('ready', () => {
 win = new BrowserWindow({
        // configuracion de la nueva ventana
    width: 800,
    height: 600,
    title: 'Hola mundo!',
    center: true,
    maximizable: false,
        // fullscreen: true,
    show: false
  })
  setMainIpc(win)
  setupErrors(win)

// cargar una url
  win.once('ready-to-show', () => {
    win.show()
  })

    // saber la posicion de la ventana
  win.on('move', () => {
    const position = win.getPosition()
    //console.log(`la posición es ${position}`)
  })

    // cerrar la ventana
  win.on('closed', () => {
    win = null
    app.quit()
    
  })
  win.loadURL(`file://${__dirname}/renderer/index.html`)
   // win.loadURL('http://specialnaturalive.com/mpos')
  // win.toggleDevTools() //permite ver el inspector de chrome
})




// app.quit()
