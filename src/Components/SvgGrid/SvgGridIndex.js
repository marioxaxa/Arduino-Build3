import React from 'react'
import './SvgGridStyle.css'

export default function SvgGridIndex({ data}) {
  const parser = new DOMParser();
  const [count, setCount] = React.useState('0')

  /*
  Teste

  const [localData, setLocalData] = React.useState(data);
  React.useEffect(() => { 
    setLocalData(data) 
    setCount(count + 1)
  }, [data]);
  **/

  return (
    <div className='Grid' key={count} >

      <button className='GridButton' onClick={() => {setCount(count + 1)}}> Load </button>

      {data.map(d => {
        if(!d.filename.startsWith('svg.icon')) {return}
        const doc = parser.parseFromString(d.content, 'text/html');
        const svg = doc.getElementsByTagName('svg')[0];
        return(
          <div className='IconDiv' key={d.filename} onClick={() =>{console.log(d.filename)}} >
            <div className='IconSvgDiv'>
              <svg 
                width={svg.width.baseVal.value}
                height={svg.height.baseVal.value}
                dangerouslySetInnerHTML={{__html: svg.innerHTML}}
              />
            </div>
          </div>
        )
      })}
      
    </div>
  )
}