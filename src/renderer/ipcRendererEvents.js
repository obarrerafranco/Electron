import { ipcRenderer } from 'electron'
import { addImagesEvents,selectEvent,searchImagesEvent,clearImages, loadImages, selectFirstImage  } from './images-ui'

function setIpc (){
    ipcRenderer.on('load-images', (event,images) => {
        //console.log(`pong recibido - ${arg}`)
        clearImages()
        loadImages(images)
        addImagesEvents()
        selectFirstImage()
    })
} 

function openDirectory () {
    ipcRenderer.send('open-directory')
}

module.exports = {
    setIpc: setIpc,
    openDirectory : openDirectory
}