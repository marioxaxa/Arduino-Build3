import React from 'react'
import SvgGridItemIndex from '../SvgGridItem/SvgGridItemIndex';
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
        const currentSvg = doc.getElementsByTagName('svg')[0];
        return(
              <SvgGridItemIndex
                key={d.filename}
                svg={currentSvg}
                name={d.filename}
              />
        )
      })}
      
    </div>
  )
}