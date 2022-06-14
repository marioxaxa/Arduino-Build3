import React from 'react'
import './SvgGridStyle.css'

export default function SvgGridIndex({ files }) {
  const parser = new DOMParser();

  const clickteste = (files) => {
    const text = parser.parseFromString(files.fileContent, 'text/html')
    console.log(text)
  }

  return (
    <div className='Grid' onClick={() => {clickteste(files)}} >
      {files.map(fileContent => {
        const doc = parser.parseFromString(fileContent[0], 'text/html');
        const svg = doc.getElementsByTagName('svg')[0];
        if (!svg) return null;
        return (
          <svg 
            width={svg.width.baseVal.value}
            height={svg.height.baseVal.value}
            dangerouslySetInnerHTML={{__html: svg.innerHTML}}
          >  
          </svg>
        );
      })}
    </div>
  )
}