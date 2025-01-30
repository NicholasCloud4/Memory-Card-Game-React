import React from 'react'

export default function Option({ valueArray }) {

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
