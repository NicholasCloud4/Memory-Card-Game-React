import { decodeEntity } from 'html-entities';
import EmojiButton from './EmojiButton';

export default function MemoryCard({ handleClick, data }) {

    /**
     * Challenge:
     * 1) In the components folder, create a new component, "EmojiButton". The component should return 
     *    an HTML button element equivalent to the button in the "MemoryCard" component.
     * 
     * 2) Refactor the "MemoryCard" component to render the new "EmojiButton" instead of the current 
     *    HTML button element. Pass three props to the "EmojiButton": "content" (the emoji itself), 
     *    "style" (the class names) and "handleclick" (the function reference).
     * 
     * 3) Rename the "emojiEl" variable to "cardEl" to make it clear that we create the card here in 
     *    the "MemoryCard" component while the emoji itself is rendered in the "EmojiButton" component.
     * 
     * 4) In the "App" component, log "selectedCards" to the console. Run the code and click some cards 
     *    to check that your refactored code is working.
     */

    // const emojiArray = ['🐶', '🐷', '🐙', '🐛', '🐵', '🐶', '🐷', '🐙', '🐛', '🐵']

    const cardEl = data.map((emoji, index) =>
        <li key={index} className="card-item">
            <EmojiButton
                content={decodeEntity(emoji.htmlCode[0])}
                style="btn btn--emoji"
                handleClick={() => handleClick(emoji.name, index)}
            />


        </li>
    )

    return <ul className="card-container">{cardEl}</ul>
}