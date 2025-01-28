import { decodeEntity } from "html-entities";

export default function EmojiButton({
    emoji,
    index,
    handleClick,
    selectedCardEntry,
    matchedCardEntry,
}) {
    /**
     * Challenge:
     * 2) Create a new variable, "btnAria", and conditionally assign it a value depending on whether the card is matched, 
     *    selected or neither. Use the following values:
     *      a) Matched: the name of the emoji + "Matched".
     *      b) Selected: the name of the emoji + "Not matched yet".
     *      c) Neither: "Card upside down".
     * 
     * 3) Set an aria-label on the button. The value you give it should inform about the position of the card and also contain the "btnAria".
     *      - An example: "Position 1: monkey face. Not matched yet."
     * 
     * 4) Set an aria-live attribute on the button and give it the value "polite".
     * 💡 Hint: Use the "index" prop to determine the card's position, but remember that humans start counting from 1, not 0.
     */

    let btnAria = matchedCardEntry ? `${decodeEntity(emoji.name)}. Matched.` : selectedCardEntry ? `${decodeEntity(emoji.name)}. Not matched yet.` : "Card upside down"

    let btnContent =
        selectedCardEntry || matchedCardEntry
            ? decodeEntity(emoji.htmlCode[0])
            : "?";

    const btnStyle = matchedCardEntry
        ? "btn--emoji__back--matched"
        : selectedCardEntry
            ? "btn--emoji__back--selected"
            : "btn--emoji__front";

    return (
        <button
            aria-label={`Position ${index + 1}: ${btnAria}`}
            aria-live="polite"
            className={`btn btn--emoji ${btnStyle}`}
            onClick={selectedCardEntry ? null : handleClick}
            disabled={matchedCardEntry ? true : false}
        >
            {btnContent}
        </button>
    );
}
