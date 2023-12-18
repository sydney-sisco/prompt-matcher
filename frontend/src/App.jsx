import React, { useState, useEffect } from 'react'
import './App.css'
import prompts from './prompts.json';

function App() {
  const [currentPrompts, setCurrentPrompts] = useState([])
  const [clickedImage, setClickedImage] = useState(null)
  const [clickedPrompt, setClickedPrompt] = useState(null)

  // game state
  const [currentMatches, setCurrentMatches] = useState([])
  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)

  useEffect(() => {
    getPrompts()
  }
    , [])

  useEffect(() => {
    if (currentMatches.length === 4) {
      alert('You win! Go to next level')
      setLevel((prev) => prev + 1)
      // setLives((prev) => prev + 1)
      setCurrentMatches([])
      getPrompts()
    }
  }
    , [currentMatches])

  useEffect(() => {
    if (level === 4) {
      alert('You win the game!')
      setLevel(1)
      setLives(3)
      setCurrentMatches([])
      getPrompts()
    }
  }
    , [level])

  useEffect(() => {
    if (lives === 0) {
      alert('Game over!')
      setLevel(1)
      setLives(3)
      setCurrentMatches([])

      getPrompts()
    }
  }, [lives])

  useEffect(() => {
    if (clickedImage === null || clickedPrompt === null) {
      return
    }

    if (clickedImage === clickedPrompt) {
      alert('Correct!')

      setCurrentMatches((prev) => [...prev, clickedImage])

      setClickedImage(null)
      setClickedPrompt(null)
    } else {
      alert('Wrong!')
      setClickedImage(null)
      setClickedPrompt(null)

      setLives((prev) => prev - 1)
    }
  }
    , [clickedImage, clickedPrompt])

  const getPrompts = () => {
    // get 4 random prompts
    const tempPrompts = []
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * prompts.length)
      tempPrompts.push(prompts[randomIndex])
    }

    setCurrentPrompts(tempPrompts)

    // reset matched
    setCurrentMatches([])
  }

  return (
    <div className="container">
      <Header />
      {/* <Columns items={currentPrompts}
        currentMatches={currentMatches}
        clickedImage={clickedImage}
        setClickedImage={setClickedImage}
        clickedPrompt={clickedPrompt}
        setClickedPrompt={setClickedPrompt}
      /> */}
      <Images items={currentPrompts} currentMatches={currentMatches} clickeditem={clickedImage} onClick={setClickedImage} />
      <Prompts items={currentPrompts} currentMatches={currentMatches} clickeditem={clickedPrompt} onClick={setClickedPrompt} />
      <Status level={level} lives={lives} />
      {/* <button onClick={getPrompts}>Get Prompts</button> */}
    </div>
  )
}

export default App

const Header = () => (
  <div className="header">
    <h1>game</h1>
  </div>
)

const Status = ({ level, lives }) => (
  <div className='status-container'>
    <div>Level: {level} / 3</div>
    <div>Lives: {lives} / 3</div>
  </div>
)

const Images = ({ items, currentMatches, onClick }) => {

  const [randomizedItems, setRandomizedItems] = useState([])

  useEffect(() => {
    console.log('items', items);
    const preSort = [...items];
    const tempItems = preSort.sort(() => 0.5 - Math.random())
    setRandomizedItems(tempItems)
  }, [items])

  const [selectedIndex, setSelectedIndex] = useState(null)

  const handleClick = (item, index) => {
    console.log('clicked image', item)
    setSelectedIndex(index)
    onClick(item)
  }

  return (
    <div className="images-container">
      {randomizedItems.map((item, index) => (
        <img
          key={index}
          src={item.url}
          alt={item}
          className={`image-item ${selectedIndex === index ? 'selected' : ''} ${currentMatches.includes(item) ? 'matched' : ''}`}
          onClick={() => handleClick(item, index)}
        />
      ))}
    </div>
  )
}

const Prompts = ({ items, currentMatches, onClick }) => {

  const [selectedIndex, setSelectedIndex] = useState(null)

  const handleClick = (item, index) => {
    console.log('clicked prompt', item)
    setSelectedIndex(index)
    onClick(item)
  }

  return (
    <div className="prompts-container">
      {
        items.map((item, index) => (
          <span
            key={index}
            className={`text-item ${selectedIndex === index ? 'selected' : ''} ${currentMatches.includes(item) ? 'matched' : ''}`}
            onClick={() => handleClick(item, index)}
          >
            {item.prompt}
          </span>
        ))
      }
    </div>
  )
}
