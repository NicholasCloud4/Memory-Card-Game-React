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
            let emojisArray = getEmojisArray(dataSlice)

            setEmojisData(emojisArray)
            setIsGameOn(true)

        } catch (error) {
            console.log(error)
        }

    }


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

    function getEmojisArray(data) {
        /**
         * Challenge:
         * 1) Create a new variable, "pairedEmojisArray". This variable should be an array 
         *    that includes each emoji object from the "data" array twice.
         * 
         * 2) Use the Fisher-Yates algorithm to shuffle "pairedEmojisArray" and return it at 
         *    the bottom of the function.
         * 
         * 3) Run the code and start a new game.
         * 
         * 💡 Hints: In step 1, use the array spread operator to create a new array.
         *           In step 2, google the Fisher-Yates algorithm!
        */

        let pairedEmojisArray = [...data, ...data]

        for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = pairedEmojisArray[i]
            pairedEmojisArray[i] = pairedEmojisArray[j]
            pairedEmojisArray[j] = temp
        }

        return pairedEmojisArray
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