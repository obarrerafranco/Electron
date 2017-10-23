import { ipcMain, dialog } from 'electron'
import isImage from 'is-image'
import filesize from 'filesize'
import fs from 'fs'
import path from 'path'

function setMainIpc (win) {

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
  
  ipcMain.on('open-save-dialog', (event, ext) => {
    //console.log(ext)
    dialog.showSaveDialog(win, {
      title: 'Guardar Imagen Modificada',
      buttonLabel: 'Guardar Imagen',
      filters: [{name: 'Images', extensions : [ext.substr(1)]}]
    }, (file => {
      //console.log(file)
      if (file) {
        event.sender.send('save-image', file)
      }
    }))
  })
  
  ipcMain.on('show-dialog', (event, info) => {
    dialog.showMessageBox(win, {
      type: info.type,
      title: info.title,
      message: info.message
    })
  })
}

module.exports = { setMainIpc: setMainIpc }
  