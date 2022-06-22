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
            console.log(cortado[2])
            if (cortado[2] && !(cortado[2] == 'fzb') && !(cortado[2] == 'fzp')) {
              componentName = cortado[2].slice(0,-(cortado[1].length))
              componentName = componentName.substring(0,20)
              contentType = cortado[1]
              console.log('normal')
            } else if (cortado[2] == 'fzp') {
              componentName = cortado[1].substring(0,20)
              contentType = 'part'
              console.log('part')
            } else {
              componentName = 'fzbList'
              contentType = cortado[0]
              console.log('fzb')
            }

            console.log(componentName)
            console.log(contentType)
            
            let tempObj = new Object

            tempObj.componentName = componentName
            tempObj[contentType] = fileData

            
            
            if (contentType == 'fzb') {
              let index = dataLet.findIndex(e => e.componentName == 'fzbList')
              dataLet[index][contentType] = fileData
            } else if (dataLet.some(e => e.componentName ==componentName)) {
              //console.log(tempObj)
              //console.log(dataLet)
              //console.log(contentType)
              console.log('é igual')
              tempObj[contentType] = fileData

              let index = dataLet.findIndex(e => e.componentName == componentName)
              dataLet[index][contentType] = fileData
            } else {
              console.log('n é igual')
              dataLet.push(tempObj)
            }
            

            



            /**
            if (dataLet.find(a => a.name = componentName)) {
              console.log(dataLet.find(a => a.name = componentName))
              let a = dataLet.find(a => a.name = componentName)
              a[contentType] = fileData

            } else {
              let tempObj = new Object()
              tempObj.name = componentName
              tempObj[contentType] = fileData
              dataLet.push(tempObj)
              console.log(`não foi - ${dataLet.find(a => a.name = componentName)}`)
            }
            */
            
            

            //console.log(dataLet)
            /** 
            if (!dataLet.some(componentName)) {
              console.log('aaaaa')
            }
            dataLet.push({filename: filename, content: fileData})
            */
           //console.log('1')
          })
          .then( () => {
            //Aqui transferimos para a variavel global
            //console.log(`tamanho: ${dataLet.length}`)
            setData(dataLet)
            console.log(data)
            //console.log('2')
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
      {/*<DragAreaIndex dragMap={dragMap}/>*/}
    </div>
  );
}

export default App;