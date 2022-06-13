import React, {useContext} from 'react'
import './DropZoneStyle.css'

export default function DropZoneIndex({ onDrop }) {
  const drop = React.useRef(null)
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    drop.current.addEventListener('dragover', handleDragOver);
    drop.current.addEventListener('dragenter', handleDragEnter);
    drop.current.addEventListener('dragleave', handleDragLeave);
    drop.current.addEventListener('drop', handleDrop);

    return () => {
      drop.current.removeEventListener('dragover', handleDragOver);
      drop.current.removeEventListener('drop', handleDrop);
      drop.current.removeEventListener('dragenter', handleDragEnter);
      drop.current.removeEventListener('dragleave', handleDragLeave);
    };
  }, [drop, onDrop]);


  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  function handleDrop(e) {
    onDrop(e);
    setDragging(false);
  }

  return (
    <div className='DropZone' ref={drop}>
      {dragging ?
        <span className='DragOver'>
          Solte aqui.
        </span> :
        <span>
          Arraste para aqui.
        </span>
      }
    </div>
  )
}