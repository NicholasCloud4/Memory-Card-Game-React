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

    const [isFirstRender, setIsFirstRender] = useState(true)
    const [formData, setFormData] = useState(intitialFormData)
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


    function handleFormChange(e) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }

        })

    }

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
            setIsFirstRender(false)

        } catch (error) {
            console.log(error)
            setIsError(true)
        } finally {
            setIsFirstRender(false)
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
        //console.log("name=" + name + " index=" + index)

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
            {!isGameOn && !isError ? <Form handleSubmit={startGame} handleChange={handleFormChange} isFirstRender={isFirstRender} /> : null}
            {isGameOn === true && areAllCardsMatched === false ? <AssistiveTechInfo emojisData={emojisData} matchedCards={matchedCards} /> : null}
            {areAllCardsMatched === true ? <GameOver handleClick={resetGame} /> : null}
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} selectedCards={selectedCards} matchedCards={matchedCards} />}
            {isError === true ? <ErrorCard handleClick={resetError} /> : null}
        </main>
    )
}