import Card from './card.js'
class Deck
{
    // queue implementation in deck
    constructor()
    {   this.front = 0;
        this.rear = 0;
        this.cards = [];
        this.Suit = ['heart','diamond','club','spade']
        this.Ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
        this.initializeDeck();
    }
    pushCard = (Card) =>{
        try
        {
            if (this.rear >= 52)
                {
                    console.log("Unable to push cards exceeded the length");
                }
                else
                {   
                    this.cards[this.rear] = Card;
                    console.log("cards pushed in the deck")
                    this.rear++;
                }
        }
        catch(e)
        {
            console.log("Error in pushCard",e)
        }
        
    }
    popCard = () => 
    {   
        try
        {
            if(this.front == this.rear)
                {
                    console.log("No card in the Deck");
                    return null;
                }
                else
                {
                    let Lastcard = this.cards[this.front];
                    this.front +=1;
                    console.log(Lastcard)
                    return Lastcard;
                }
        }
        catch(e)
        {
            console.log("Error in popCard",e)
        }
       
    }
    size = () =>
    {
        return this.rear;
    }
    initializeDeck = () =>
        {   try
            {
                for(let suit of this.Suit)
                    {
                        for(let rank of this.Ranks)
                        {
                            this.pushCard(new Card(suit,rank));
                        }
                    }
            }
            catch(e)
            {
                console.log("Error in initializeDeck",e)
            }
           
        }
    shuffleDeck = () =>{
        try
        {
            for(let i = this.cards.length-1; i>0; i--)
                {
                    const j = Math.floor(Math.random()*(i+1));
                    [this.cards[i],this.cards[j]] = [this.cards[j],this.cards[i]];
                }
        }
        catch(e)
        {
            console.log("Error in shuffleDeck",e)
        }
      
    } 
    DisplayCards = () =>
    {
        this.cards.forEach(card => {
           console.log(card.toString()); 
        });
    }
}
export default Deck;
