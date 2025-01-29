import React from 'react'
import RegularButton from './RegularButton'

export default function GameOver({ handleClick }) {

    /**
     * Challenge:
     * 3) Render an instance of the "RegularButton" component right below the p element. 
     *   The button should receive "handleClick" as a prop and its content should be "Play again".
     *  
     * 4) Play a game and when you've finished, click the "Play again" button to check that everything is working.
     *    Clicking the button should make the previous game disappear and instead make the "Form" component render again.
     * 
     * 💡 Hint: Take a good look at the "RegularButton" and the "Form" components if you're unsure of how to use the "RegularButton" component here.
     */

    return (
        <div className='wrapper wrapper--accent'>
            <p className='p--large'>You've matched all the memory cards!</p>
            <RegularButton handleClick={handleClick}>Play Again!</RegularButton>
        </div>
    )
}
