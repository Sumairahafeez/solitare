import { useEffect, useState } from 'react';
import React from 'react'
import Card from './Card.jsx';
// import depencies
function Tablu({tableu , Isupdate , removeCardFromDec}) {
    // setTableu so that the component rerenders everytime it is updated
    const [tab,setTab] = useState([])
    const [selectedCards,setSelectedCards] = useState([]) // cards for the list of cards to be moved
    // use effects to implement rerendering of the component
    useEffect(() => {
      setTab([...tableu.TableuPiles])
    }, [tableu])
    useEffect(() => {
        setTab([...tableu.TableuPiles])
      }, [Isupdate])
    //   function to handle drag and drop functionality
    const handleDragStart = (event, card, fromPileIndex) => {
        try
        {
            HandleCardClick(fromPileIndex,card);
            event.dataTransfer.setData('card', JSON.stringify(card));
            event.dataTransfer.setData('fromPileIndex', fromPileIndex.toString());
            console.log("Dragging card:", card, "from pile index:", fromPileIndex);
            
        }
        catch(e)
        {
            console.log("Error in handleDragStart",e)
        }
       
      };
    const handleDrop = (event,toPileIndex) => 
    {   event.preventDefault()
        console.log("Handle drop is called")
        try{
            const cardData = event.dataTransfer.getData('card');
            if(!cardData)
            {
                console.log('In valid Card');
            }
            // else
            {
            const card = JSON.parse(cardData);
            // if card is present provide pileIndex then move the card
            if(card)
            {
                const fromPileIndex = parseInt(event.dataTransfer.getData('fromPileIndex'));
                console.log("pileIndex",fromPileIndex)
                if(fromPileIndex>=0)
                {   
                    if(selectedCards.length>0)
                        {
                            selectedCards.forEach(card => {
                                if(tableu.moveCard(card,toPileIndex))
                                    {   
                                        tableu.TableuPiles[fromPileIndex].pop();
                                        const updateTab = [...tableu.TableuPiles]
                                        updateTab[toPileIndex] = tableu.TableuPiles[toPileIndex].list;
                                        setTab(updateTab);
                                        tableu.flipTopCard(fromPileIndex);
                                    }  
                            });
                        }   
                }
                // else if the card is moved from deck no pileIndex will be recieved
                else
                {
                   if(tableu.moveCard(card,toPileIndex))
                   {
                    removeCardFromDec();
                    const updateTab = [...tableu.TableuPiles]
                    updateTab[toPileIndex] = tableu.TableuPiles[toPileIndex].list;
                    setTab(updateTab);
                   }
                   
                }
            }
        }
    }
    catch(error)
    {
        console.log("Error in handle drop",error)
    }
       
    }
    // function to handle drag over
    const HandleDragOver = (event) => {
        console.log("Handle drag over is called")
        event.preventDefault();
    }
    // function to handle card click and get all selected cards
    const HandleCardClick = (fromPileIndex,card) =>
    {
        const ToPile = tableu.TableuPiles[fromPileIndex];
        if(ToPile)
        {
            const cardsToMove = ToPile.list.retrieveWholeList();
            setSelectedCards(cardsToMove);
            console.log("Selected cards for dragging:", cardsToMove);
        }
        else
        {
            setSelectedCards(card)
        }
    }
    // function to render the cards in each Tableu pile
    const renderPile =(pile,pileIndex) =>
    {   
        try
        {
            const cardsToShow = pile.GetCards();
            return(
                <>
              <div key={pileIndex} className='relative w-full h-full' onDrop = {(event) => handleDrop(event,pileIndex)} onDragOver={HandleDragOver}>
              {cardsToShow.map((card, cardIndex) => (
                
                 <div key={cardIndex} className='absolute' style={{ top: `${cardIndex * 30}px` }} onClick={()=>{HandleCardClick(pileIndex)}}>
                    {console.log(cardIndex)}
                    <Card suit={card.suit} rank={card.rank} faceUp={card.faceUp} draggable = {true} onDragStart = {(event)=>{handleDragStart(event,card,pileIndex)}} onClick={()=>{HandleCardClick(pileIndex)}}/>
                </div>
              ))}
          </div>
        </>
        )
        }
        catch(e)
        {
            console.log("Error in renderPile",e)
        }
       
}
// if Tableu is empty return null
    if (!tableu.TableuPiles || !tableu) {
      return null; 
  }
// return the component
  return ( 
    <div className='flex flex-row px-20 justify-center items-start gap-5'>
      {console.log(tableu.TableuPiles)}
            {tableu.TableuPiles.map((pile, pileIndex) => (
                <div key={pileIndex} className=' relative w-[12%] h-52 rounded-md flex flex-col items-center'>
                    {renderPile(pile, pileIndex)}  
                </div>
            ))}
        </div>
  )
}

export default Tablu