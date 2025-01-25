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
            let dataSlice = getDataSlice(data)
            setEmojisData(dataSlice)
            //console.log(getRandomIndicies(data))
            setIsGameOn(true)

        } catch (error) {
            console.log(error)
        }

    }

    /**
     * Challenge:
     * 1) Below the "startGame" function, create a new function called "getDataSlice".
     *    The function should reveice "data" as a parameter.
     * 
     * 2) Inside this function, make a call to "getRandomIndicies" and store the return value in 
     *    a variable called "randomIndices".
     * 
     * 3) Map over "randomIndices" and use the random numbers stored in this array to create 
     *    a new array of random emojis selected from "data". Store this new array in a variable called 
     *   "dataSlice" and return it at the bottom of the function.
     * 
     * 4) Inside the try block of the "startGame" function, make a call to "getDataSlice", 
     *    passing "data" as an argument. Save the return value in a variable called "dataSlice".
     * 
     * 5) Delete the "dataSample" variable and replace "dataSample" with the new "dataSlice"
     *    variable in the "setEmojisData" function.
     * 
     * 6) Run the code and start a new game to check that your code is working.
    */

    function getDataSlice(data) {
        let randomIndices = getRandomIndicies(data)

        let dataSlice = randomIndices.map((indices) => {
            return data[indices]
        })

        return dataSlice
    }

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