import { useEffect, useState } from 'react'
import Form from '/components/Form'
import MemoryCard from '/components/MemoryCard'
import EmojiButton from './components/EmojiButton'
import AssistiveTechInfo from './components/AssistiveTechInfo'



export default function App() {

    const [isGameOn, setIsGameOn] = useState(false)
    const [emojisData, setEmojisData] = useState([])
    const [selectedCards, setSelectedCards] = useState([])
    const [matchedCards, setMatchedCards] = useState([])
    const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)

    /**
     * Challenge:
     * 1) In the "components" folder, create a new component called "AssistiveTechInfo".
     *   The component should take two props, "emojisData" and "matchedCards". 
     *   It should return a section element containing one h2 and two p elements, rendering the following content:
     *      h2: "Game status"
     *      p: "Number of matched pairs: x."
     *      p: "Number of cards left to match: x."
     * 
     * 2) Render the new component between "Form" and "MemoryCard" when "isGameOn" is true and "areAllCardsMatched" is false. 
     *    Remember to pass down props.
     * 
     * 3) Play a memory game to check that everything is working, both the dynamically updating content and 
     *    the conditional rendering of the component.
     * 
     * 4) Add the class "sr-only" to the section element in the AssistiveTechInfo component to hide it from the window.
     * 
     * For now, don't worry about setting aria attributes on the new component!
     * 
     * 💡 Hint: In step 1, use the props you receive to do some math inside the p elements.
     */

    //console.log(matchedCards)


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
        console.log("name=" + name + " index=" + index)

        if (selectedCards.length < 2) {
            setSelectedCards((prevSelectedCards) => {
                return [...prevSelectedCards, { name, index }]
            })
        } else if (selectedCards.length === 2) {
            setSelectedCards([{ name, index }])
        }
    }

    return (
        <main>
            <h1>Memory</h1>
            {!isGameOn && <Form handleSubmit={startGame} />}
            {isGameOn === true && areAllCardsMatched === false ? <AssistiveTechInfo emojisData={emojisData} matchedCards={matchedCards} /> : null}
            {isGameOn && <MemoryCard handleClick={turnCard} data={emojisData} selectedCards={selectedCards} matchedCards={matchedCards} />}
        </main>
    )
}