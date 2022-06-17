import './App.css';
import React, { useState } from 'react'
import SideBarIndex from './Components/SideBar/SideBarIndex';
import JSZip from 'jszip';

function App() {

  const [data, setData] = useState([])
  var jsZip = new JSZip



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
            dataLet.push({filename: filename, content: fileData})
          })
          .then( () => {
            //Aqui transferimos para a variavel global
          console.log(`tamanho: ${dataLet.length}`)
          setData(dataLet)
          }
          )
        }
        )
        
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
    </div>
  );
}

export default App;