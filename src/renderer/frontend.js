import { setIpc, openDirectory, saveFile } from './ipcRendererEvents' 
import { addImagesEvents,selectEvent,searchImagesEvent } from './images-ui'

window.addEventListener('load', () => {
  //document.getElementById('mensaje').innerHTML = 'Este es un mensaje de JS'
  //console.log(os.cpus()) //imprime cpu del equipo
  setIpc();
  addImagesEvents() //cambia la imagen grande
  searchImagesEvent() //busqueda de imagenes
  selectEvent() //filtros
  buttonEvent('open-directory', openDirectory)
  buttonEvent('save-button', saveFile)
})

function buttonEvent(id, func) {
  const openDirectory = document.getElementById(id)
  openDirectory.addEventListener('click', func)
}