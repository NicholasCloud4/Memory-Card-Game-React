import { useState } from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'



export default function App() {

    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])


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

        let pairedEmojisArray = [...data, ...data]

        for (let i = pairedEmojisArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = pairedEmojisArray[i]
            pairedEmojisArray[i] = pairedEmojisArray[j]
            pairedEmojisArray[j] = temp
        }

        return pairedEmojisArray
    }

    /**
     * Challenge:
     * 1) Check if the clicked card is already in the selectedCards array. 
     *  Store the result of this check in a variable called "selectedCardEntry".
     * 
     * 2) Update the code that adds a clicked card to "selectedCards". Make sure that the following conditions are met:
     *      - Any given card can only be added once within the same round.
     *      - The length of the "selectedCards" array should never exceed 2.
     * 
     * 3) Log "selectedCards" to the console.
     * 💡 Hint: Use the JavaScript .find() method to solve step 1.
     */

    console.log(selectedCards)


    function turnCard(name, index) {
        // console.log("name=" + name + " index=" + index)
        let selectedCardEntry = selectedCards.find((emoji) => {
            if (emoji.index === index) {
                console.log("card already selected")
                return true
            }
        })

        if (!selectedCardEntry && selectedCards.length < 2) {
            setSelectedCards((prevSelectedCards) => {
                return [...prevSelectedCards, { name, index }]
            })
        } else if (selectedCardEntry && selectedCards.length === 2) {
            setSelectedCards([{ name, index }])
        }
    }

    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} />}
        </main>
    )
}