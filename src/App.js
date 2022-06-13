import './App.css';
import React, { useState } from 'react'
import SvgGridIndex from './Components/SvgGrid/SvgGridIndex';
import SideBarIndex from './Components/SideBar/SideBarIndex';

function App() {
  //aqui
  const decompress = require('decompress')

  const [files, setFiles] = useState([]);


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