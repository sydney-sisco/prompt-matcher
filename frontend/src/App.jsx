import React, { useState, useEffect } from 'react'
import futureLogo from '/future.svg'
import './App.css'
import prompts from './prompts.json';

function App() {
  const [currentPrompts, setCurrentPrompts] = useState([])
  const [clickedImage, setClickedImage] = useState(null)
  const [clickedPrompt, setClickedPrompt] = useState(null)

  useEffect(() => {
    if (clickedImage === null || clickedPrompt === null) {
      return
    }

    if (clickedImage === clickedPrompt) {
      alert('You win!')
      setClickedImage(null)
      setClickedPrompt(null)
    } else {
      alert('You lose!')
      setClickedImage(null)
      setClickedPrompt(null)
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
  }

  return (
    <>
      <Columns items={currentPrompts}
        setClickedImageIndex={setClickedImage}
        setClickedPromptIndex={setClickedPrompt}
      />
      <button onClick={getPrompts}>Get Prompts</button>
    </>
  )
}

export default App

const Columns = ({ items, setClickedImageIndex, setClickedPromptIndex }) => {

  const handleImageClick = (itemIndex) => {
    console.log('clicked', itemIndex)
    setClickedImageIndex(itemIndex)
  }

  const handlePromptClick = (itemIndex) => {
    console.log('clicked', itemIndex)
    setClickedPromptIndex(itemIndex)
  }


  return(
  <div className="container">
    <div className="image-column">
        <Images items={items} onClick={handleImageClick}/>
    </div>
    <div className="text-column">
        <Prompts items={items} onClick={handlePromptClick}/>
    </div>
  </div>
)};

const Images = ({ items, onClick }) => {

  const [randomizedItems, setRandomizedItems] = useState([])

  useEffect(() => {
    console.log('items', items);
    const preSort = [...items];
    const tempItems = preSort.sort(() => 0.5 - Math.random())
    setRandomizedItems(tempItems)
  }, [items])

  return(
    randomizedItems.map((item, index) => (
      <img
        key={index}
        src={`https://magic-8-ball.sfo3.cdn.digitaloceanspaces.com/${item}`}
        alt={item}
        className="image-item"
        onClick={() => onClick(item)}
      />
    ))
  )
}

const Prompts = ({ items, onClick }) => (
  items.map((item, index) => (
    <span key={index} className="text-item"
      onClick={() => onClick(item)}
    >
      {item.replaceAll('_', ' ').replace('.png', '')}
    </span>
  ))
)
