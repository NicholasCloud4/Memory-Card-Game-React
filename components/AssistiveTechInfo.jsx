import React from 'react'

export default function AssistiveTechInfo({ emojisData, matchedCards }) {

    /**
     * Challenge:
     * Turn the section element and its children into a single unit and prompt 
     * AT to present all content of this live region to the user whenever parts of it change.
     */

    return (
        <section className='sr-only' aria-live='polite' aria-atomic='true'>
            <h2>Game Status</h2>
            <p>Number of matched pairs: {matchedCards.length / 2}</p>
            <p>Number of cards left to match: {emojisData.length - matchedCards.length}</p>
        </section>
    )
}
