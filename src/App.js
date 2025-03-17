// import the dependencies
import logo from './logo.svg';
import './App.css';
import Card from './components/Card.jsx';
import Deck from './components/Deck.jsx';
import Foundations from './components/Foundations.jsx';
import Tablu from './components/Tablu.jsx';
import dec from './Backend/Deck.js'
import card from './Backend/card.js'
import WinPage from './components/WinPage.jsx';
import Tableu from './Backend/Tableu.js';
import Stockpile from './Backend/StockPile.js';
import foundation from './Backend/Foundation.js';
import { useState,useEffect } from 'react';
import { tab } from '@testing-library/user-event/dist/tab.js';
import { fromJSON } from 'postcss';
import ScoreBoard from './components/ScoreBoard.jsx';
// implement the component function
function App() {
// set usestates for game variables like deck tableu etc for implementation
const [deck,setDeck] = useState(new dec())
const [isSet,setcards] = useState(false)
const [tableu,setTableu] = useState(new Tableu())
const [stockpile,setStockpile] = useState(null)
const [update,setisupdate] = useState(false)
const [isClicked,setisClicked] = useState(false)
const [topCard,settopCard] = useState(null)
const [foundations,setFoundation] = useState(new foundation())
const [isWon,setisWon] = useState(false)
const [Gamescore,setGamescore] = useState(0)
// implement use effect to shuffle the deck and initialize the tableu
  useEffect(() => {
    try
    {
    deck.shuffleDeck();
    deck.DisplayCards();
    const newTableu = new Tableu(deck);
    newTableu.initializeTableu();
    setTableu(newTableu);
    const newstockpile = new Stockpile(deck);
    newstockpile.initializeStockpile();
    setStockpile(newstockpile);
    setcards(true);
    }
    catch(e)
    {
      console.log("Error in App.js",e)
    }
    
  },[]) 
  // implement the function to remove card from deck
  const removeCardFromDec = () =>
    {   try
        {
            const newCard = stockpile.popCard();
            if(newCard)
            {   let anotherCard = new card(newCard.suit,newCard.rank)
                settopCard(anotherCard)
                stockpile.rear -=1;
                stockpile.pushCard(newCard)
                setStockpile(stockpile)
            }
            setisupdate(()=>{
              setGamescore(prev => prev+5)
              return !update
            });
        }
        catch(e)
        {
            console.log("Error in removeCardFromDec",e)
        }
        
    }
    // implement the function to remove card from deck on click and replace the top card
    const deckClick = () =>
    {
        try{
          setisClicked(true);
          if(stockpile.rear >= 0) {
          const newCard = stockpile.popCard();
          if(newCard)
          {
              settopCard(new card(newCard.suit,newCard.rank))
              stockpile.pushCard(newCard)
          }
          else
          {
              console.log("no more cards in the deck")
              settopCard(null)
          }
          }
          else
          {
              console.log("I wont work")
          }
        }
        catch(e)
        {
            console.log("Error in deckClick",e)
        }
       
        
    }
    // implement the function to remove card from pile
    const removeCardFromPile = (fromPileIndex) =>
    {
      try
      {
        tableu.TableuPiles[fromPileIndex].pop();
        tableu.flipTopCard(fromPileIndex);
        setTableu(tableu);
        setisupdate(()=>{
          setGamescore(prev => prev+5)
          return !update
        });
        console.log("Card removed from pile")
      }
      catch(e)
      {
        console.log("Error in removeCardFromPile",e)
      }
     
    }
    // component rendering for app development
  return (
    <div className="w-full h-lvh bg-green-700 flex flex-col gap-5">
      <div className='w-full h-[30%] bg-green-700 flex flex-row gap-64 items-center'>
        <Deck topCard = {topCard} deckClick = {()=>deckClick()} update ={update} isClicked = {isClicked}/>
        <Foundations foundation = {foundations} removeCardFromDec = {removeCardFromDec} removeCardFromPile={removeCardFromPile} setisWon = {setisWon}/>
      </div>
      <div className='w-full h-[70%] flex flex-col gap-[220px]'>
      {isSet ? (
          <>
            {console.log("stockpile in app",stockpile)}
            <Tablu tableu={tableu} Isupdate={update} removeCardFromDec = {removeCardFromDec} />
          </>
        ) : null}
        <ScoreBoard score = {Gamescore}/>
      </div>
      {isWon ? <WinPage/> : null}
    </div>
  );
}

export default App;
