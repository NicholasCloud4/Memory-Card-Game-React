import { useEffect, useRef } from 'react'
import RegularButton from './RegularButton'
import Select from './Select'

export default function Form({ handleSubmit, handleChange, isFirstRender }) {

    /**
     * Challenge:
     * 4) Conditionally focus the div on rendering when "isFirstRender" is false.
     * 
     * 5) Test your code by playing a memory game. Make sure to navigate only using your keyboard. 
     *    When the form renders for the second time, you should see the default browser outline styling on 
     *    it (in Chrome it's blue).
     */

    let divRef = useRef(null)

    useEffect(() => {
        if (!isFirstRender) {
            divRef.current.focus()
        }
    }, [isFirstRender])

    return (
        <div className="form-container" ref={divRef} tabIndex={-1}>
            <p className="p--regular">
                Customize the game by selecting an emoji category and a number of memory cards.
            </p>
            <form className="wrapper">
                <Select handleChange={handleChange} />
                <RegularButton handleClick={handleSubmit}>
                    Start Game
                </RegularButton>
            </form>
        </div>
    )
}