import { decodeEntity } from 'html-entities';
import EmojiButton from './EmojiButton';

export default function MemoryCard({ handleClick, data, selectedCards, matchedCards }) {

    /**
     * Challenge:
     * 1) Pass "selectedCardEntry" and "matchedCardEntry" as props to "EmojiButton".
     */

    const cardEl = data.map((emoji, index) => {

        let selectedCardEntry = selectedCards.find((emoji) => emoji.index === index)
        let matchedCardEntry = matchedCards.find((emoji) => emoji.index === index)

        return (
            <li key={index} className="card-item">
                <EmojiButton
                    content={decodeEntity(emoji.htmlCode[0])}
                    style="btn btn--emoji"
                    handleClick={() => handleClick(emoji.name, index)}
                    selectedCardEntry={selectedCardEntry}
                    matchedCardEntry={matchedCardEntry}
                />
            </li>
        )
    })

    return <ul className="card-container">{cardEl}</ul>
}