import { useState } from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'

export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)

    /**
     * Challenge:
     * 1) Create a new state variable, "emojisData", with a corresponding setter function, 
     *    and initialize it as an empty array.
     * 
     * 2) Inside the try block of the startGame function, create a new variable, 
     *    "dataSample", and set it equal to the first 5 elements from "data".
     * 
     * 3) Store the "dataSample" as "emojisData" in state.
     * 
     * 4) Log "emojisData" to the console.
     * 
     * 💡 Hint: In step 2, use the JavaScript .slice() method to get the data sample.
     * ⚠️ Warning: We're still rendering our hardcoded emojis.
     */

    const [emojisData, setEmojisData] = useState([])
    console.log(emojisData)


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
            setIsGameOn(true)

        } catch (error) {
            console.log(error)
        }

    }


    function turnCard() {
        console.log("Memory card clicked")
    }

    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} />}
        </main>
    )
}