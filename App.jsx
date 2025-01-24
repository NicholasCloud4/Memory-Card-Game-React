import { useState } from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'

export default function App() {
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])

    /**
      * Challenge:
      * 1) Pass the "emojisData" as the value of a prop "data" to the MemoryCard component.
      */

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
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
        </main>
    )
}