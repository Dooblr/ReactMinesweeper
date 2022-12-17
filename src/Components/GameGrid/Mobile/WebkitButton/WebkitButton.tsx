import './WebkitButton.css'

export function WebkitButton({onTouchStart,
onTouchEnd,
onMouseDown,
onMouseUp,
innertext}:any){
  return(<>
  
    <div className='my-webkit-button' 
      onTouchStart={onTouchStart} 
      onTouchEnd={onTouchEnd} 
      onMouseDown={onMouseDown} 
      onMouseUp={onMouseUp} 
    >
      {innertext}
    </div>
  
  </>)
}