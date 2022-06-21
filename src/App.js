import './App.css';
import React, { useState } from 'react'
import SideBarIndex from './Components/SideBar/SideBarIndex';
import JSZip from 'jszip';
import DragAreaIndex from './Components/DragArea/DragAreaIndex';

function App() {

  var jsZip = new JSZip

  //Arquivos importados
  const [data, setData] = useState([])

  //Todos os componentes presentes no drag and drop
  const [dragMap, setDragMap] = useState(['arduino','rasberry'])


  //Função responsavel por extrair arquivos do zip e adicionalos no data
  function unzipFile(file) {
    return new Promise((resolve, reject) => {
    
    //Variavel temporaria para onde é passada os arquivos
    let dataLet = data

    //Aqui o arquivo é lido como um buffer
    const bufferReader = new FileReader()
    bufferReader.onload = () => {

      //Depois é extraído do .zip
      jsZip.loadAsync(bufferReader.result).then(function (zip) {
        Object.keys(zip.files).forEach(function (filename) {
          zip.files[filename].async('string').then(function (fileData) {
            //E adicionado a variavel temporaria formando um objeto composto pelo nome do arquivo e seu conteudo em texto
            let cortado = filename.split('.')
            let componentName
            let contentType
            if (!(!cortado[2] || cortado[2] == 'fzb')) {
              componentName = cortado[2].slice(0,-(cortado[1].length))
              contentType = cortado[1]
            } else {
              componentName = cortado[1]
              contentType = cortado[0]
            }

            console.log(typeof dataLet)
            //if (dataLet.find(componentName)) {console.log('55555555')}

            

            let tempObj = new Object()

            //tempObj.name = componentName

            
            tempObj[componentName] = {}

            for (let index = 0; index < dataLet.length; index++) {
              if (dataLet[index] == tempObj[componentName]) {
                tempObj[componentName].contentType = contentType
                tempObj[componentName].content = fileData
              }
            }
            
            
            dataLet.push(tempObj)

            console.log(dataLet)
            /** 
            if (!dataLet.some(componentName)) {
              console.log('aaaaa')
            }
            dataLet.push({filename: filename, content: fileData})
            */
          })
          .then( () => {
            //Aqui transferimos para a variavel global
            console.log(`tamanho: ${dataLet.length}`)
            setData(dataLet)
            console.log(data)
          })
        })
      })
    }

    bufferReader.readAsArrayBuffer(file)}
    )
  }

  //Função que lida com os arquivos dropados 
  async function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    //Arquivos dropados antes de serem lidos
    const droppedFiles = e.dataTransfer.files;

    //Para cada arquivo(i) dropado será realizado essa função onde nela os arquivos serão lidos e salvos na variavel files
    for (let i in droppedFiles) {
      let item = droppedFiles[i];
      if (typeof item === 'object') {

        //Função que extrai e adiciona os arquivos a variavel data
        await unzipFile(item)  
      }
    }
  }

  return (
    <div className="App" >
      <SideBarIndex onDrop={handleDrop} data={data} />
      <DragAreaIndex dragMap={dragMap} />
    </div>
  );
}

export default App;