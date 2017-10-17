'use strict'

// const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import devtools from './devtools'
import isImage from 'is-image'
import filesize from 'filesize'
import fs from 'fs'
import path from 'path'
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

ipcMain.on('open-directory', (event) => {
  dialog.showOpenDialog(win,{
    title: 'Seleccione la nueva ubicación',
    buttonLabel: 'Abrir Ubicación',
    properties: ['openDirectory']
  },
(dir) => {
  const images = []
  if (dir) {
    fs.readdir(dir[0], (err, files) => {
      for(var i = 0, lenght1 = files.length; i < lenght1; i++){
        if (isImage(files[i])) {
          let imageFile = path.join(dir[0], files[i])
          let stats = fs.statSync(imageFile)
          let size = filesize(stats.size, {round:0})
          images.push({filename : files[i], src: `file://${imageFile}`, size: size})
         }
      }
      //console.log(images)

      event.sender.send('load-images', images)

    })
  }
  //console.log(dir)
})
})

// app.quit()
