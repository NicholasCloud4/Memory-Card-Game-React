import React from 'react'

export default function Option({ valueArray }) {

    /**
     * Challenge:
     * 1) Iterate over the "valueArray" that we're receiving as a prop and create an option element.
     * 2) Store all of this in a new variable, "optionEl", and return this variable at the bottom of the component.
     * 
     * 💡 Hints:
     * Take a good look at the "Select" component and the "data" file to understand how you can use the "valueArray".
     * Use a ternary operator to conditionally set the text content of the option element.
     * Remember to set a key on the option tag.
     */

    let optionEl = valueArray.map(({ name, value }) => {
        return (
            <option key={value} value={value}>
                {name ? name : value}
            </option>

        )
    })

    return (
        <>
            {optionEl}
        </>
    )
}
