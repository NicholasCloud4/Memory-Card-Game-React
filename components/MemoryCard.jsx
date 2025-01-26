import { decodeEntity } from 'html-entities';

export default function MemoryCard({ handleClick, data }) {

    /**
     * Challenge:
     * 1) Pass emoji.name and index as arguments to the handleClick fuction that is called when clicking the button.
     */

    const emojiArray = ['🐶', '🐷', '🐙', '🐛', '🐵', '🐶', '🐷', '🐙', '🐛', '🐵']

    const emojiEl = data.map((emoji, index) =>
        <li key={index} className="card-item">
            <button
                className="btn btn--emoji"
                onClick={() => handleClick(emoji.name, index)}
            >
                {decodeEntity(emoji.htmlCode[0])}
            </button>
        </li>
    )

    return <ul className="card-container">{emojiEl}</ul>
}