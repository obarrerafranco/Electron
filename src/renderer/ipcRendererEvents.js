import { ipcRenderer } from 'electron'

function clearImages () {
    const oldImages = document.querySelectorAll('li.list-group-item')
  
    for(let i = 0, length1 = oldImages.length; i < length1; i++){
      oldImages[i].parentNode.removeChild(oldImages[i])
    }
  }

function loadImages (images) {

  for(let i = 0, length1 = images.length; i < length1; i++){
    const imagesList = document.querySelector('ul.list-group')
    const node = `<li class="list-group-item">
    <img class="media-object pull-left" src="${images[i].src}" width="32" height="32">
    <div class="media-body">
      <strong>${images[i].filename}</strong> 
      <p>${images[i].size}</p>
    </div>
  </li>`
  imagesList.insertAdjacentHTML('beforeend', node)
  }
}

function addImagesEvents () {
    const thumbs = document.querySelectorAll('li.list-group-item')
  
    for (let i = 0, length1 = thumbs.length; i < length1; i++) {
      thumbs[i].addEventListener('click', function () {
        changeImage(this)
      })
    }
  }

function changeImage (node) {
    if (node){
        const selected =  document.querySelector('li.selected')
    if (selected){
        selected.classList.remove('selected')
    }
    node.classList.add('selected')
    document.getElementById('image-displayed').src = node.querySelector('img').src
  }else{
    document.getElementById('image-displayed').src = ''
  }
  }  

function selectFirstImage () {
    const image = document.querySelector('li.list-group-item:not(.hidden)')
    changeImage(image)
  }
  
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