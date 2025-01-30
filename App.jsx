import { useEffect, useState } from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'
import EmojiButton from './components/EmojiButton'
import AssistiveTechInfo from './components/AssistiveTechInfo'
import GameOver from './components/GameOver'
import ErrorCard from './components/ErrorCard'


export default function App() {

    let intitialFormData = {
        category: "animals-and-nature",
        number: 10
    }

    const [formData, setFormData] = useState(intitialFormData)
    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)
    const [isError, setIsError] = useState(false)


    /**
     * Challenge:
     * 1) At the top of the component, before the state variables, create a new variable, "initialFormData", 
     *    and set it equal to an object with the following key value-pairs:
     *      - category: "animals-and-nature"
     *      - number: 10
     * 
     * 2) Create a new state variable, "formData", with a corresponding setter function, 
     *    and give it "initialFormData" as the initial value.
     * 
     * 3) Update the URL in the fetch request to use the category saved in "formData" 
     *    instead of the hardcoded category.
     * 
     * 4) Update the for loop in the "getRandomIndices" function to use the number saved in "formData" 
     *    instead of the hardcoded number 5.
     * 
     * 5) Run the code and start a game to check that your refactored code is working. You should still get 10 memory cards rendered to the mini browser.
     * 
     * 💡 Hint: In step 4, perform some mathematical operation on the number from formData to get the correct number of memory cards.
     */

    useEffect(() => {
        if (selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
            setMatchedCards((prevMatchedCards) => {
                return [...prevMatchedCards, ...selectedCards]
            })

        }

    }, [selectedCards])


    useEffect(() => {
        if (matchedCards.length === emojisData.length && emojisData.length > 0) {
            setAreAllCardsMatched(true)
        }

    }, [matchedCards])



    async function startGame(e) {
        e.preventDefault()
        try {
            //throw new Error("Something went wrong")

            const response = await fetch(`https://emojihub.yurace.pro/api/all/category/${formData.category}`)

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
            setIsError(true)
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

        for (let i = 0; i < formData.number / 2; i++) {

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
        console.log("name=" + name + " index=" + index)

        if (selectedCards.length < 2) {
            setSelectedCards((prevSelectedCards) => {
                return [...prevSelectedCards, { name, index }]
            })
        } else if (selectedCards.length === 2) {
            setSelectedCards([{ name, index }])
        }
    }

    function resetGame() {
        setIsGameOn(false)
        setSelectedCards([])
        setMatchedCards([])
        setAreAllCardsMatched(false)
    }


    function resetError() {
        setIsError(false)
    }

    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && !isError ? <Form handleSubmit={startGame} /> : null}
            {isGameOn === true && areAllCardsMatched === false ? <AssistiveTechInfo emojisData={emojisData} matchedCards={matchedCards} /> : null}
            {areAllCardsMatched === true ? <GameOver handleClick={resetGame} /> : null}
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} selectedCards={selectedCards} matchedCards={matchedCards} />}
            {isError === true ? <ErrorCard handleClick={resetError} /> : null}
        </main>
    )
}