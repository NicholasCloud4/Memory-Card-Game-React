import { decodeEntity } from 'html-entities';
import EmojiButton from './EmojiButton';

export default function MemoryCard({ handleClick, data, selectedCards, matchedCards }) {


    const cardEl = data.map((emoji, index) => {

        let selectedCardEntry = selectedCards.find((emoji) => emoji.index === index)
        let matchedCardEntry = matchedCards.find((emoji) => emoji.index === index)
        let cardStyle

        if (selectedCardEntry) {
            cardStyle = "card-item--selected"
        } else if (matchedCardEntry) {
            cardStyle = "card-item--matched"
        } else {
            " "
        }

        /**
     * Challenge:
     * 1) Pass the "index" as a prop to EmojiButton.
     */

        return (
            <li key={index} className={`card-item ${cardStyle}`}>
                <EmojiButton
                    emoji={emoji}
                    index={index}
                    handleClick={() => handleClick(emoji.name, index)}
                    selectedCardEntry={selectedCardEntry}
                    matchedCardEntry={matchedCardEntry}
                />
            </li>
        )
    })

    return <ul className="card-container">{cardEl}</ul>
}