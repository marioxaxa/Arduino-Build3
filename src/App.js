import './App.css';
import React, { useState } from 'react'
import SvgGridIndex from './Components/SvgGrid/SvgGridIndex';
import SideBarIndex from './Components/SideBar/SideBarIndex';
import JSZip from 'jszip';

function App() {

  const [files, setFiles] = useState([]);
  var jsZip = new JSZip

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
              resolve(reader.result); 
      };
      reader.readAsText(file);
    });
  }

  async function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    const droppedFilesContent = [];

    for (let i in droppedFiles) {
      let item = droppedFiles[i];
      if (typeof item === 'object') {

        jsZip.loadAsync(e).then(function (zip) {
          Object.keys(zip.files).forEach(function (filename) {
            zip.files[filename].async('string').then(function (fileData) {
              console.log(filename)
              console.log(fileData)    
              
            })
          })
        })
        const fileContent = await readFile(item);
        droppedFilesContent.push(fileContent);
      }
    }

    setFiles([...files, ...droppedFilesContent]);
    console.log('arquivos:')
    console.log(files)
  }

  return (
    <div className="App">
      <SideBarIndex onDrop={handleDrop} files={files}/>
      
      <SvgGridIndex files={ files }/>
    </div>
  );
}

export default App;