import card from "../components/Card";
import Deck from "./Deck";
import LinkedList from "./LinkedList";
import Tableu from "./Tableu";
class Stockpile
{
    constructor(deck)
    {
        this.deck = deck;
        this.top = 0;
        this.rear = 0;
        this.cards = [];
    }
    initializeStockpile = () =>
    {
        for(let i = 0; i<24; i++)
        {
            this.pushCard(this.deck.popCard());
        }
    }
    pushCard = (Card) =>
    {
        {   console.log(Card)
            this.cards[this.rear] = Card;
            this.rear++;
        }
    }
    
    popCard = () =>
    {
        if(this.top == this.rear)
        {
            console.log("No more cards in the stockpile");
        }
        else
        {
            let Lastcard = this.cards[this.top];
            this.top +=1;
            return Lastcard;
        }
    }
    peek = () =>
    {
        if(this.top == this.rear)
        {
            console.log("No more cards in the stockpile");
        }
        else
        {
            return this.cards[this.top];
        }
    }
    getWholeStockpile = () =>
    {
        return this.cards.slice(0,this.rear-1);
    }
}
export default Stockpile