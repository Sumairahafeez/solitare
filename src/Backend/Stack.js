import card from './card.js'
import LinkedList from './LinkedList.js';
class Node 
{
    constructor()
    {
        this.card = [];
        this.next = null;
    }
}
class Stack
{
    constructor()
    {
        this.top = null;
        this.list = new LinkedList();
    }
    push(Card)
    {
        const newNode = new Node();
        newNode.card = Card;
        newNode.next = this.top;
        this.top = newNode;
    }
    size()
    {
        return this.top ? this.top : 0;
    }
    pop()
    {
        if(this.top == null)
        {
            return null;
            
        }
        const card = this.top.card;
        this.top = this.top.next;
        return card;
    }
    peek() {
        if (this.top == null) {
            return null;
        }
        return this.top.card;
    }
    GetCards()
    {
        let current = this.top;
        const cards = []
        while(current)
        {
                cards.push(current.card);
                
                current = current.next;
            
        }
        return cards.reverse();
    }
}
export default Stack