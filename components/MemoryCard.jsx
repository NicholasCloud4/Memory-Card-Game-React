import { decodeEntity } from 'html-entities';
import EmojiButton from './EmojiButton';

export default function MemoryCard({ handleClick, data, selectedCards, matchedCards }) {

    /**
      * Challenge:
      * 2) Refactor the code inside the callback function of the .map() method to explicitly return the li element.
      * 
      * 3) Inside the same callback function, use the "selectedCards" prop to check if the card is selected. 
      *    Store the result of this check in a new variable called "selectedCardEntry".
      * 
      * 4) Similarly, use the "matchedCards" prop to check if a card is matched, and store the result of the 
      *    check in a new variable called "matchedCardEntry".
      * 
      * 💡 Hint: Not sure how to solve step 3 and 4? Then take a good look at the turnCard function in the App component.
      */

    // const emojiArray = ['🐶', '🐷', '🐙', '🐛', '🐵', '🐶', '🐷', '🐙', '🐛', '🐵']

    const cardEl = data.map((emoji, index) => {

        let selectedCardEntry = selectedCards.find((emoji) => emoji.index === index)
        let matchedCardEntry = matchedCards.find((emoji) => emoji.index === index)

        return (
            <li key={index} className="card-item">
                <EmojiButton
                    content={decodeEntity(emoji.htmlCode[0])}
                    style="btn btn--emoji"
                    handleClick={() => handleClick(emoji.name, index)}
                />
            </li>
        )
    })

    return <ul className="card-container">{cardEl}</ul>
}