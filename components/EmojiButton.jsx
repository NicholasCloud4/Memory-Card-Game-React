
export default function EmojiButton({ content, style, handleClick, selectedCardEntry, matchedCardEntry }) {
    /**
         * Challenge:
         * 2) Create a new variable, "btnContent", and use "selectedCardEntry" 
         *    and "matchedCardEntry" that you receive as props to conditionally assign a value to it. 
         * 
         *    If a card is either matched or selected, "btnContent" should be the value of the "content" 
         *    prop; otherwise, it should be a question mark.
         * 
         * 3) Render "btnContent" as the content of the button.
         * 💡 Hint: Use a ternary operator to solve step 2.
         */
    let btnContent = selectedCardEntry || matchedCardEntry ? content : "?"
    return (
        <button className={style} onClick={handleClick}>{btnContent}</button>
    )

}