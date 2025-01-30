import RegularButton from './RegularButton'

export default function Form({ handleSubmit, handleChange }) {
    /**
     * Challenge:
     * 1) Create two select elements: one for emoji category and one for number of memory cards. 
     *    Each select element should have a name, an id and an onChange event handler. Use the following values:
     *      - Category: name="category", id="category", onChange={handleChange}
     *      - Number of cards: name="number", id="number", onChange={handleChange}
     * 
     * 2) Inside of each select element, create five option elements, using the following values:
     *      - Category: "animals-and-nature", "food-and-drink", "travel-and-places", "objects", "symbols"
     *      - Number: 10, 20, 30, 40, 50
     * 
     * 3) Give each select element a label describing the select menu.
     */

    return (
        <div className="form-container">
            <form className="wrapper">
                <div className="form__inner-wrapper">
                    <label htmlFor="category">Select a category</label>
                    <select name="category" id="category" onChange={handleChange}>
                        <option value="animals-and-nature">Animals and nature</option>
                        <option value="food-and-drink">Food and drink</option>
                        <option value="travel-and-places">Travel and places</option>
                        <option value="objects">Objects</option>
                        <option value="symbols">Symbols</option>
                    </select>
                </div>
                <div className="form__inner-wrapper">
                    <label htmlFor="number">Select a number</label>
                    <select name="number" id="number" onChange={handleChange}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="40">40</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <RegularButton handleClick={handleSubmit}>
                    Start Game
                </RegularButton>
            </form>
        </div>
    )
}