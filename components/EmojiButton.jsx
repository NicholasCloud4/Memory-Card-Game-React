
export default function EmojiButton({ content, handleClick, selectedCardEntry, matchedCardEntry }) {

    let btnContent = selectedCardEntry || matchedCardEntry ? content : "?"

    const btnStyle =
        matchedCardEntry ? "btn--emoji__back--matched" :
            selectedCardEntry ? "btn--emoji__back--selected" :
                "btn--emoji__front"

    /**
    * Challenge:
    * Add a disabled attribute to the button and give it a value that is thruthy when 
    * a card is matched, otherwise falsy.
    */

    /**
     * Challenge:
     * Refactor the onClick event handler. Use a ternary operator to set the value to null if a card is 
     * selected, otherwise "handleClick".
     */


    return (
        <button className={`btn btn--emoji ${btnStyle}`} onClick={selectedCardEntry ? null : handleClick} disabled={matchedCardEntry ? true : false}>{btnContent}</button>
    )

}