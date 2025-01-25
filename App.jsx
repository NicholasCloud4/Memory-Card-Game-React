import { useState } from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'


/**
 * To do:
 * Step 1: Get random emojis from API
 * Step 2: Duplicate unique emojis
 * Step 3: Shuffle emojis data
 */


export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])


    async function startGame(e) {
        try {
            e.preventDefault()
            const response = await fetch("https://emojihub.yurace.pro/api/all/category/animals-and-nature")

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            const data = await response.json();
            let dataSample = data.slice(0, 5)
            setEmojisData(dataSample)
            //console.log(data)
            console.log(getRandomIndicies(data))
            setIsGameOn(true)

        } catch (error) {
            console.log(error)
        }

    }

    /**
     * Challenge:
     * 1) Create a new function, "getRandomIndices", right below the "startGame" function.
     *    It should receive "data" as a parameter.
     * 
     * 2) In this new function, declare a new variable, "randomIndicesArray", and initialize it as an empty array.
     * 
     * 3) After declaring "randomIndicesArray", use a for loop to generate 5 random numbers within a 
     *    range equivalent to the length of the "data" array and push these numbers to "randomIndicesArray". 
     *    Return "randomIndicesArray" at the bottom of the function.
     * 
     * 4) In the try block of the "startGame" function, log the return value from "getRandomIndices" 
     *    to the console, passing "data" to it as an argument.
     * 
     *💡 Hint: We want exactly 5 unique random numbers. 
     *         What can you do inside the for loop to ensure that we'll get that?
    */

    function getRandomIndicies(data) {
        let randomIndicesArray = []

        for (let i = 0; i < 5; i++) {

            const randomNum = Math.floor(Math.random() * data.length)
            if (!randomIndicesArray.includes(randomNum)) {
                randomIndicesArray.push(randomNum)
            } else {
                i--
            }
        }

        return randomIndicesArray
    }


    function turnCard() {
        console.log("Memory card clicked")
    }

    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
        </main>
    )
}