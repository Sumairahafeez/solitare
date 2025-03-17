import React ,{useEffect,useState}from 'react'
import Card from './Card'
// import dec from '../Backend/Deck.js'
import card from '../Backend/card.js'
import Stockpile from '../Backend/StockPile.js'
import Tablu from './Tablu.jsx'
import Validtaion from '../Backend/Validtaion.js'
// function to implement the deck component
function Deck({topCard , deckClick , update , isClicked}) {
    useEffect(() => {
}, [update])
// function to handle drag start
const HandleDragStart = (event,card) => 
{
    try
    {
      console.log("Deck card is moved")
      event.dataTransfer.setData('card',JSON.stringify(card))
    }
    catch(e)
    {
      console.log("Error in HandleDragStart",e)
    }
   
}
// return the deck component
  return (
    <div className='w-[25%] h-[95%] border-gray-800 rounded-md  flex flex-row justify-center items-center gap-10'>
        <div className='w-[37%] h-[95%] bg-contain' style={{backgroundImage: `url(${require(`../assets/card-back.png`)})`}} onClick={()=>deckClick()}></div>
        {/* if the card is clicked and the top card is not empty render the card in deck component */}
        {isClicked && topCard ?
        (<div className='w-[37%] h-[95%]'>
        <Card suit = {topCard.suit} rank = {topCard.rank} faceUp={true} onClick={() => deckClick()} draggable={true} onDragStart={(event) => {HandleDragStart(event,topCard);}} />
        </div>)
        :
        null
        }
        
    </div>
  )
}

export default Deck