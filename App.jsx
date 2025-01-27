import { useEffect, useState } from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'



export default function App() {

    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [isGameOver, setIsGameOver] = useState(false)

    console.log(matchedCards)
    console.log(isGameOver)

    useEffect(() => {
        if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
            setMatchedCards((prevMatchedCards) => {
                return [...prevMatchedCards, ...selectedCards]
            })

        }

    }, [selectedCards])

    /**
     * Challenge:
     * 1) Create a new state variable, "isGameOver", with a corresponding setter function. 
     *    Initialize the variable as false.
     * 
     * 2) Create a new useEffect that sets "isGameOver" to true when all memory cards have been matched 
     *    and the game is over. Make sure to consider the following:
     *      - What value should we use in the dependencies array?
     *      - What condition can we use to determine whether the game is over?
     */

    useEffect(() => {
        if (matchedCards.length === emojisData.length && emojisData.length > 0) {
            setIsGameOver(true)
        }

    }, [matchedCards])



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
        } else if (!selectedCardEntry && selectedCards.length === 2) {
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