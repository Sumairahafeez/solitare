
import React, { useEffect } from 'react'
import foundation from '../Backend/Foundation.js'
import Card from './Card.jsx';
// Import necessary dependencies and components
function Foundations({foundation , removeCardFromDec , removeCardFromPile , setisWon}) {
  const [isCardPresent, setIsCardPresent] = React.useState(0);
  const [cards, setCard] = React.useState([]);
  // useeffect for rerendering the component
  useEffect(() => {
   setisWon(foundation.victoryCheck()); 
  }, [cards])
  if (!foundation) {
    return null;
  }
  // function to handle drop in foundation pile
  const HandleDrop = (event,toPileIndex) =>
  {   
    try
    {
      event.preventDefault();
      console.log("Handle drop is called in foundation pile")
      const cardData = event.dataTransfer.getData('card');
      if(cardData)
      {
        console.log("Handle drop in foundation pile")
        const card = JSON.parse(cardData);
        if(card)
        {
          console.log("Card in foundation",card)
          if(foundation.insertCard(card,toPileIndex))
          {
            setCard((prevCards)=>{
              const updatedCards = [...prevCards];
              if(!updatedCards[toPileIndex]){
                updatedCards[toPileIndex] = [];
              }
              updatedCards[toPileIndex] = [...updatedCards[toPileIndex],card];
              console.log("Updated cards",updatedCards)
              return updatedCards;
            })
            const fromPileIndex = parseInt(event.dataTransfer.getData('fromPileIndex'));
            if(fromPileIndex)
            {
              removeCardFromPile(fromPileIndex);
            }
            else
            {
              removeCardFromDec();
            }
          }
          else
          {
            console.log("Invalid card")
          }
          
          setIsCardPresent(isCardPresent+1);
         
        }
      }
    }
    catch(e)
    {
      console.log("Error in HandleDrop",e)
    }
     
  }
  // function to render the foundation pile
  const renderFoundation = (cardsInPile) => {
    try
    {
      if (cardsInPile && cardsInPile.length > 0) {
          return cardsInPile.map((cards,index)=>(
          <div  key={index}
            style={{ position: 'absolute', top: index * 1 }} >
          <Card suit={cards.suit} rank={cards.rank} faceUp={true} draggable = {false} onDragStart = {()=>{console.log("cannot drag the card")}}/>
          </div>))} 
      else {
        return null;
          }
    }
    catch(e)
    {
      console.log("Error in renderFoundation",e)
    }
   
  }
  // return the foundation component
  return(
    <div className='w-[50%] h-[95%] flex flex-row gap-6  items-center justify-center'>
        {foundation.foundation.map((_,foundationIndex)=>(
          <div className='w-40 h-[95%] border  border-gray-700 rounded-md relative' key={foundationIndex}  onDrop={(event)=>HandleDrop(event,foundationIndex)} onDragOver={(event)=>{event.preventDefault()}}>
            {renderFoundation(cards[foundationIndex])}
            </div>))}
    </div>
        
  )
}

export default Foundations