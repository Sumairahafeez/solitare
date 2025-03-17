import Card from "./card";
class Node
{
    constructor(card)
    {
        this.card = card;
        this.next = null;
    }
}
class LinkedList
{
    constructor()
    {
        this.head = null;
        this.size = 0;
    }
    insertData = (card) =>{
        try
        {
            let current;
            if(this.head === null)
            {
                this.head = new Node(card);
            }
            else
            {
                current = this.head;
                while(current.next)
                {
                    current = current.next;
                }
                current.next = new Node(card);
            }
        }
        catch(e)
        {
            console.log("Error in insertData",e)
        }
        
    }
    display = () =>
    {
        let current = this.head;
        while(current)
        {
            console.log(current.card.toString());
            current = current.next;
        }
    }
    retrieveWholeList = () =>
    {   
        try
        {
            let current = this.head;
            let list = [];
            while(current)
            {
                list.push(current.card);
                current = current.next;
            }
            return list;
        }
        catch(e)
        {
            console.log("Error in retrieveWholeList",e)
        }
       
    }
    retrieveFromSpecificIndex = (index)=>{
        try
        {
            let current = this.head;
            let count = 0;
            while(current.next && count < index)
            {
                current = current.next;
                count++;
            }
            let cards = [];
            let indexCard = current.next;
            current.next = null;
            while(indexCard)
            {
                cards.push(indexCard.card);
                indexCard = indexCard.next;
            }
            return cards;
    
        }
        catch(e)
        {
            console.log("Error in retrieveFromSpecificIndex",e)
        }
    }
}
export default LinkedList