import { ipcRenderer } from 'electron'
import { addImagesEvents,selectEvent,searchImagesEvent,clearImages, loadImages, selectFirstImage  } from './images-ui'
import path from 'path'
function setIpc (){
    ipcRenderer.on('load-images', (event,images) => {
        //console.log(`pong recibido - ${arg}`)
        clearImages()
        loadImages(images)
        addImagesEvents()
        selectFirstImage()
    })

    ipcRenderer.on('save-image', (event, file) => {
        console.log(file)
    })
} 

function openDirectory () {
    ipcRenderer.send('open-directory')
}

function saveFile () {
    const image = document.getElementById('image-displayed').dataset.original
    const ext = path.extname(image)

    ipcRenderer.send('open-save-dialog',ext)
}

module.exports = {
    setIpc: setIpc,
    openDirectory : openDirectory,
    saveFile : saveFile
}