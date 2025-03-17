import React from 'react'
// card component that displays the card on the screen
function card({suit,rank,faceUp,onClick,draggable,onDragStart}) {
  return (
    faceUp?
    <div className='w-32 h-44 bg-gray-800 bg-contain' onClick={onClick} draggable onDragStart={onDragStart} 
    style={{
        backgroundImage: `url(${require(`../assets/${suit}-${rank}.png`)})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center'}}>
    </div>
    :
    <div className=' w-32 h-44 bg-gray-100 bg-cover'  style={{ backgroundImage: `url(${require('../assets/card-back.png')})`}}>
    </div>
  )
}

export default card