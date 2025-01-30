import { useEffect, useState } from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'
import EmojiButton from './components/EmojiButton'
import AssistiveTechInfo from './components/AssistiveTechInfo'
import GameOver from './components/GameOver'
import ErrorCard from './components/ErrorCard'

/**
     * Mega challenge:
     * 1) In the "components" folder, create a new component, "ErrorCard".
     *    The component should return a div wrapping around two p elements and an instance 
     *    of the RegularButton component, displaying the following content:
     *      - p #1: "Sorry, there was an error."
     *      - p #2: "Please come back later or click the button below to try restarting the game."
     *      - RegularButton: "Restart game"
     * 
     * 2) Style "ErrorCard" using the following class names:
     *      - div: "wrapper wrapper--accent"
     *      - p #1: "p--large"
     *      - p #2: "p--regular"
     * 
     * 3) Make "ErrorCard" accessible!
     * 
     * 4) Render "ErrorCard" conditionally here in the "App" component below "MemoryCard" when "isError" is true.
     * 
     * 5) Pass the "resetError" function through props to the "RegularButton" in the "ErrorCard" and use it on the
     *    onClick event handler in the "RegularButton" component.
     * 
     * 6) Refactor the conditional rendering of the "Form" component so that it is not rendered when there is an error.
     *
     * 7) Run your code to test that everything is working.
     * 
     * 💡 Hint: Take a good look at the "GameOver" component if you get stuck.
     */

export default function App() {

    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)
    const [isError, setIsError] = useState(false)

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
            throw new Error("Something went wrong")

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