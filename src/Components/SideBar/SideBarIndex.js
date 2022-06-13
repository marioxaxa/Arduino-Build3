import React from 'react'
import './SideBarStyle.css'
import DropZoneIndex from '../DropZone/DropZoneIndex';
import SvgGridIndex from '../SvgGrid/SvgGridIndex';

export default function SideBarIndex({onDrop, files}) {

  const [sideBarStatus, setsideBarStatus] = React.useState(false)
  const SideBarRef = React.useRef(null)
  const ButtonRef = React.useRef(null)

  const SideBarButtonClick = () => {
    SideBarRef.current.classList.toggle("closed")
    ButtonRef.current.classList.toggle("closed")
    setsideBarStatus(!sideBarStatus)
  }
    
  

  return (
    <aside ref={SideBarRef} className="SideBar">
      <div ref={ButtonRef} className="Button" onClick={ () => SideBarButtonClick()} />
      { sideBarStatus ? 
      <> </> : <DropZoneIndex onDrop={ onDrop }/>}
      <SvgGridIndex files={ files }/>
    </aside>
  )
}
