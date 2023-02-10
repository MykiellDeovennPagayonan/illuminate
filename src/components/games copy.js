import React, { useRef, useEffect, useState } from "react"
import "./games.css";
import { classes, classViewing, studentViewing } from "./backend/data";

//-----------------------game 1-----------------------

function WordSearch() { 
  let words = ["cat", "dog", "sun", "man", "top", "map", "pen", "box", "hat", "car", "bus", "leg", "fun", "run", "bun", "wet", "red", "big", "mix", "six", "yes", "lip", "cup", "tap", "rot", "fun", "sat", "wet", "wag", "hot", "wet", "fog", "jog", "gas", "tag", "act", "bag", "get", "pig", "dig", "fit", "kit", "nit", "sit", "bit", "kit", "zip", "yam", "yap", "yum"]
  const [ dataHolder, setDataHolder] = useState([])
  let indexes = []
  let numWords = 3
  const rows = 10
  const columns = 8
  let repeat;

  const [ wordsChosen, SetWordsChosen] = useState([])
  const [ boxes, SetBoxes] = useState([])
  const [ done, setDone ] = useState(false)
  
  const [ barProgress, setBarProgress ] = useState(1000)

  useEffect(() => {
    const timer = setInterval(() => {
      if (barProgress <= 0) {
        if (dataHolder !== []){
          classes[classViewing].studentsList[studentViewing].matchingAndDrawing.wordSearch.exercises.push(dataHolder)
          setDataHolder([])
        }
        setBarProgress(1000)
      } else {
        setBarProgress(prevProgress => prevProgress - 10)
      }
    }, 1000)
    return () => clearInterval(timer)

  })

  function setWordsAndLetters(){
    repeat = false
    let boxesContent = []
    let wordsChosenInitial = []
  
    for (let i = 0; i < rows*columns; i++) {
      boxesContent.push({letter: "-", activation: false})
    }
  
    for (let i = 0; i < numWords; i++) {
      let randomWordIndex = Math.floor(Math.random()*words.length)
      let arrangementIndex = Math.floor(Math.random()*4) // 0 is down, 1 is up, 2 is right, 3 is left
  
      let xStartInitial;
      let yStartInitial;
  
      let xEndInitial;
      let yEndInitial;
  
      if (arrangementIndex === 0) {
        xStartInitial = Math.floor(Math.random()*rows)
        yStartInitial = Math.floor(Math.random()*(columns - words[randomWordIndex].length))
        xEndInitial = xStartInitial
        yEndInitial = yStartInitial + (words[randomWordIndex].length - 1)
      } else if (arrangementIndex === 1) {
        xStartInitial = Math.floor(Math.random()*rows)
        yStartInitial = Math.floor(Math.random()*(columns - words[randomWordIndex].length)) + words[randomWordIndex].length
        xEndInitial = xStartInitial
        yEndInitial = yStartInitial - (words[randomWordIndex].length - 1)
      } else if (arrangementIndex === 2) {
        xStartInitial = Math.floor(Math.random()*(rows - words[randomWordIndex].length))
        yStartInitial = Math.floor(Math.random()*columns)
        xEndInitial = xStartInitial + (words[randomWordIndex].length - 1)
        yEndInitial = yStartInitial
      } else if (arrangementIndex === 3) {
        xStartInitial = Math.floor(Math.random()*(rows - words[randomWordIndex].length)) + words[randomWordIndex].length
        yStartInitial = Math.floor(Math.random()*columns)
        xEndInitial = xStartInitial - (words[randomWordIndex].length - 1)
        yEndInitial = yStartInitial
      }
  
      let xWrite = xStartInitial
      let yWrite = yStartInitial
  
      for (let j = 0; j < words[randomWordIndex].length; j++) {
        if (boxesContent[yWrite*rows + xWrite].letter === "-" || boxesContent[yWrite*rows + xWrite].letter === String(words[randomWordIndex][j])){
          boxesContent[yWrite*rows + xWrite].letter = String(words[randomWordIndex][j])
        } else {
          repeat = true
        }
  
        if (arrangementIndex === 0){
          yWrite++
        } else if (arrangementIndex === 1) {
          yWrite--
        } else if (arrangementIndex === 2) {
          xWrite++
        } else {
          xWrite--
        }
      }
  
      wordsChosenInitial.push({
        word: words[randomWordIndex],
        xStart: xStartInitial,
        yStart: yStartInitial,
        xEnd: xEndInitial,
        yEnd: yEndInitial,
        arrangement: arrangementIndex,
        activation: false
      })
    }

    for (let i = 0; i < rows*columns; i++) {
      if (boxesContent[i].letter === "-") {
        boxesContent[i].letter = letterBackground[i]
      }
    }

    SetWordsChosen(wordsChosenInitial)
    SetBoxes(boxesContent)
  }
  
  function randomLetters(){
    let letterBackgroundInitial = []
    for (let k = 0; k < rows*columns; k++){
      letterBackgroundInitial.push(String.fromCharCode(Math.floor(Math.random()*26) + 97))
    }
    return letterBackgroundInitial
  }

  const [ letterBackground, setLetterBackground ] = useState(randomLetters())

  function newSet(){
    setDone(false)
    setLetterBackground(randomLetters())
    do {
      setWordsAndLetters()
    } while (repeat)
  }

  useEffect(() => {
    newSet()
  }, [])

  function startIndex(indexS) {
    indexes[0] = indexS
  }

  function endIndex(indexE) {
    indexes[1] = indexE
    refreshBoard()
  }

  function refreshBoard() {
    let boxesInitial = [...boxes]
    for (let i = 0; i < rows*columns; i++){
      boxesInitial[i].activation = false
    }
    boxesInitial[indexes[0]].activation = true
    boxesInitial[indexes[1]].activation = true
    SetBoxes(boxesInitial)
    checkWord()
  }

  function checkWord(){
    let boxesInitial = [...boxes]
    let wordsChosenInitial = [...wordsChosen]
    for (let i = 0; i < wordsChosen.length; i++){
      if (wordsChosen[i].activation === true){
        let xWrite = wordsChosen[i].xStart
        let yWrite = wordsChosen[i].yStart
        for (let j = 0; j < wordsChosen[i].word.length; j++){
          boxesInitial[yWrite*rows + xWrite].activation = true
          if (wordsChosen[i].arrangement === 0){
            yWrite++
          } else if (wordsChosen[i].arrangement === 1) {
            yWrite--
          } else if (wordsChosen[i].arrangement === 2) {
            xWrite++
          } else {
            xWrite--
          }
        }
      } else if(boxes[wordsChosen[i].yStart*rows + wordsChosen[i].xStart].activation === true && boxes[wordsChosen[i].yEnd*rows + wordsChosen[i].xEnd].activation === true) {
        wordsChosenInitial[i].activation = true
      }
    }
    SetWordsChosen(wordsChosenInitial)
    activateCompleteLetters()
  }

  function activateCompleteLetters(){
    let boxesInitial = [...boxes]
    let completeWordsCount = 0
    for (let i = 0; i < wordsChosen.length; i++){
      if (wordsChosen[i].activation === true){
        completeWordsCount++
        let xWrite = wordsChosen[i].xStart
        let yWrite = wordsChosen[i].yStart
        for (let j = 0; j < wordsChosen[i].word.length; j++){
          boxesInitial[yWrite*rows + xWrite].activation = true
          if (wordsChosen[i].arrangement === 0){
            yWrite++
          } else if (wordsChosen[i].arrangement === 1) {
            yWrite--
          } else if (wordsChosen[i].arrangement === 2) {
            xWrite++
          } else {
            xWrite--
          }
        }
      } 
    }

    if (completeWordsCount === wordsChosen.length){
      let dataHolderInitial = [...dataHolder]
      dataHolderInitial.push({wordsChosen: wordsChosen, boxes: boxes, letterBackground: letterBackground})
      setDataHolder(dataHolderInitial)
      setDone(true)
    }
    SetBoxes(boxesInitial)
  }

  return (
    <>
      <div className="word-search-words-grid">
        {wordsChosen.map((wordsChosen) => {
          if (wordsChosen.activation === false){
            return(<button className="word-search-words"> {wordsChosen.word} </button>)
          } else {
            return(<button className="word-search-words-activated"> {wordsChosen.word} </button>)
          }
        })}
        <button className="word-search-words" style={{width: 260, backgroundColor: "#E7BF83"}} onClick={() => newSet()}> next set </button>
        {done ? <div className="green-check"></div> : null}
      </div>
      <div className="grid">
        {boxes.map((box, index) => {
          if (box.activation === false){
            return (<button className="grid-box" onMouseDown={() => startIndex(index)} onMouseUp={() => {endIndex(index)}}> {box.letter} </button>)
          } else {
            return (<button className="grid-box-enlarged"> {box.letter} </button>)
          }
        })}
      </div>
      <button className="timer">
        <div className="timer-bar" style={{width: (barProgress/1000 * 1113)}}> </div>
      </button>
    </>
  );
}

//-----------------------game 2-----------------------

function SequenceMemorization() {
  const [ dataHolder, setDataHolder] = useState([])
  const [ boxes, setBoxes ] = useState([])
  const [ lettersIn, SetLettersIn ] = useState([])
  const [ show, setShow ] = useState(true)
  const [ done, setDone ] = useState(false)
  let numLetters = 4
  let lettersVault = ["b", "d", "p", "q", "m", "w", "n", "u", "g", "j", "z", "x", "v", "k", "f"]

  const [ barProgress, setBarProgress ] = useState(1000)

  useEffect(() => {
    const timer = setInterval(() => {
      if (barProgress <= 0) {
        if (dataHolder !== []){
          classes[classViewing].studentsList[studentViewing].matchingAndDrawing.sequenceMemorization.exercises.push(dataHolder)
          setDataHolder([])
        }
        setBarProgress(1000)
      } else {
        setBarProgress(prevProgress => prevProgress - 5)
      }
    }, 500)
    return () => clearInterval(timer)

  })

  function randomLetters(){
    let lettersChosenInitial = []

    for (let i = 0; i < numLetters; i++){
      let randomLetterIndex = Math.floor(Math.random()*lettersVault.length)
      lettersChosenInitial.push(lettersVault[randomLetterIndex])
    }
  
    return lettersChosenInitial
  }

  function randomWord(){
    let lettersChooseFrom = [...randomizedLetters]
    let wordInitial = []
    while (lettersChooseFrom.length > 0){
      let wordsIndexRandom = Math.floor(Math.random()*lettersChooseFrom.length)
      wordInitial.push(lettersChooseFrom[wordsIndexRandom])
      lettersChooseFrom.splice(wordsIndexRandom, 1)
    }
    setShow(true)
    return wordInitial
  }

  const [ randomizedLetters, SetRandomizedLetters] = useState(randomLetters)

  const [ randomizedWord, SetRandomizedWord] = useState(randomWord)

  function createBoxLetters(){
    let boxesInitial = []
    for (let i = 0; i < randomizedLetters.length; i++){
      boxesInitial.push(randomizedLetters[i])
    }
    setBoxes(boxesInitial)
  }

  useEffect(() => {
    createBoxLetters()
  }, [])

  function addLetter(index){
    let lettersInInitial = [...lettersIn]
    let boxesInitial = [...boxes]
    boxesInitial.splice(index, 1)
    lettersInInitial.push(boxes[index])
    SetLettersIn(lettersInInitial)
    setBoxes(boxesInitial)
  }

  function removeLetter(index){
    let lettersInInitial = [...lettersIn]
    let boxesInitial = [...boxes]
    boxesInitial.push(lettersInInitial[index])
    lettersInInitial.splice(index, 1)
    SetLettersIn(lettersInInitial)
    setBoxes(boxesInitial)
  }

  function dontShow(){
    setShow(false)
  }

  function doShow(){
    setShow(true)
    setBarProgress(prevProgress => prevProgress - 50)
  }

  function newSet(){
    setDone(false)
    SetRandomizedLetters(randomLetters)
    SetRandomizedWord(randomWord)
    createBoxLetters()
  }

  function checkMatch(){
    let wordInBox = ""
    let wordToMatch = ""
    for (let i = 0; i < lettersIn.length; i++){
      wordInBox += lettersIn[i]
    }
    for (let i = 0; i < randomizedWord.length; i++){
      wordToMatch += randomizedWord[i]
    }
    if (wordInBox === wordToMatch){
      setDone(true)
      SetLettersIn([])
      let dataHolderInitial = [...dataHolder]
      dataHolderInitial.push({boxes: "hi"})
      setDataHolder(dataHolderInitial)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      checkMatch()
    }, 500)
    return () => clearInterval(timer)

  }, [checkMatch])

  return (
    <>
      {done ? 
        <div>
          <div className="green-check" style={{position: "absolute", top: 300, left: 1100}}></div>
          <button className="new-set" onClick={() => newSet()}> new set </button>
        </div>
       : <button className="new-set" onClick={() => doShow()}> show again </button>}
      <div className="box-input">
        {lettersIn.map((box, index) => {
          return (<button className="box-letters-smaller" onClick={() => removeLetter(index)}> {box} </button>)
        })}
      </div>
      <div className="series-box-letters">
        {boxes.map((box, index) => {
            return (<button className="box-letters" onClick={() => {addLetter(index); checkMatch()}}> {box} </button>)
        })}
      </div>
      {show ? 
        <button className="word-sequence" onClick={() => dontShow()}>
          {randomizedWord.map((box) => {
            return (<button className="box-letters"> {box} </button>)
          })}
        </button> : null
      }
      <button className="timer">
        <div className="timer-bar" style={{width: (barProgress/1000 * 1113)}}> </div>
      </button>
    </>
  );
}

//-----------------------game 3-----------------------

function LetterRescramble() {
  const numWords = 4
  const [ dataHolder, setDataHolder] = useState([])
  let words = ["cat", "dog", "sun", "man", "top", "map", "pen", "box", "hat", "car", "bus", "leg", "fun", "run", "bun", "wet", "red", "big", "mix", "six", "yes", "lip", "cup", "tap", "rot", "fun", "sat", "wet", "wag", "hot", "wet", "fog", "jog", "gas", "tag", "act", "bag", "get", "pig", "dig", "fit", "kit", "nit", "sit", "bit", "kit", "zip", "yam", "yap", "yum"]
  const [ wordsChosen, setWordsChosen ] = useState([])
  const [ boxes, setBoxes ] = useState([])
  const [ lettersIn, SetLettersIn ] = useState([])
  const [ done, setDone ] = useState(false)
  const [ lettersInitial, SetLettersInitial ] = useState([])

  const [ barProgress, setBarProgress ] = useState(1000)

  useEffect(() => {
    const timer = setInterval(() => {
      if (barProgress <= 0) {
        if (dataHolder !== []){
          classes[classViewing].studentsList[studentViewing].matchingAndDrawing.LetterRescramble.exercises.push(dataHolder)
          setDataHolder([])
        }
        setBarProgress(1000)
      } else {
        setBarProgress(prevProgress => prevProgress - 20)
      }
    }, 500)
    return () => clearInterval(timer)

  })

  console.log(dataHolder)

  function randomWordsLetters(){
    setDone(false)
    let wordsChosenInitial = []
    let lettersVault = []
    let boxesInitial = []

    for (let i = 0; i < numWords; i++) {
      let wordIndex = Math.floor(Math.random() * words.length)
      wordsChosenInitial.push(words[wordIndex])
    }

    for(let i = 0; i < wordsChosenInitial.length; i++){
      for(let j = 0; j < wordsChosenInitial[i].length; j++){
        lettersVault.push(wordsChosenInitial[i][j])
      }
    }

    while (lettersVault.length > 0) {
      let randomLetterIndex = Math.floor(Math.random() * lettersVault.length)
      boxesInitial.push(lettersVault[randomLetterIndex])
      lettersVault.splice(randomLetterIndex, 1)
    }
    
    setBoxes(boxesInitial)
    setWordsChosen(wordsChosenInitial)
    SetLettersInitial(boxesInitial)
    SetLettersIn([])
  }

  useEffect(() => {
    randomWordsLetters()
  }, [])

  function addLetter(index){
    let lettersInInitial = [...lettersIn]
    let boxesInitial = [...boxes]
    boxesInitial.splice(index, 1)
    lettersInInitial.push(boxes[index])
    SetLettersIn(lettersInInitial)
    setBoxes(boxesInitial)
  }

  function removeLetter(index){
    let lettersInInitial = [...lettersIn]
    let boxesInitial = [...boxes]
    boxesInitial.push(lettersInInitial[index])
    lettersInInitial.splice(index, 1)
    SetLettersIn(lettersInInitial)
    setBoxes(boxesInitial)
  }

  function completeWordCheck(){

    let wordFormed = ""
    for (let i = 0; i < lettersIn.length; i++){
      wordFormed += lettersIn[i]
    }

    for (let i = 0; i < wordsChosen.length; i++){
      if(wordFormed === wordsChosen[i]){
        let wordsChosenInitial = [...wordsChosen]
        wordsChosenInitial.splice(i, 1)

        if (wordsChosenInitial.length === 0){
          setDone(true)
          let dataHolderInitial = [...dataHolder]
          dataHolderInitial.push({wordsChosen: "1", boxes: "ha"})
          setDataHolder(dataHolderInitial)
        }

        setWordsChosen(wordsChosenInitial)
        SetLettersIn([])
      }
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      completeWordCheck()
    }, 100)
    return () => clearInterval(timer)
  })

  return (
    <>
      <button className="new-set" onClick={() => randomWordsLetters()}> new set </button>
      <div className="box-input">
      {lettersIn.map((letters, index) => {
            return (<button className="box-letters-smaller" onClick={() => {removeLetter(index); completeWordCheck()}}> {letters} </button>)
        })}
      </div>
      <div className="series-words">
        {wordsChosen.map((word) => {
          return (<button className="words"> {word} </button>)
        })}
        {done ? <div className="green-check"></div> : null}
      </div>
      <div className="series-box-letters">
        {boxes.map((box, index) => {
          return (<button className="box-letters-smaller" onClick={() => {addLetter(index); completeWordCheck()}}> {box} </button>)
        })}
      </div>
      <button className="timer">
        <div className="timer-bar" style={{width: (barProgress/1000 * 1113)}}> </div>
      </button>
    </>
  );
}

//-----------------------game 4-----------------------

let LineDrawing = () => {
    const [ erase, setErase ] = useState(false)
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
  
    const [isDrawing, setIsDrawing] = useState(false)
  
    useEffect(() => {
      const canvas = canvasRef.current
      canvas.width = 400
      canvas.height = 400
  
      const context = canvas.getContext("2d");
      context.lineCap = "round";
      context.strokeStyle = "black";
      context.lineWidth = 5;
      contextRef.current = context;
    }, [])
  
    const startDrawing = ({nativeEvent}) => {
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.beginPath();
      if( erase === true){
        contextRef.current.lineWidth = 20;
      } else{
        contextRef.current.lineWidth = 5;
      }
      contextRef.current.moveTo(offsetX, offsetY);
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      setIsDrawing(true);
      nativeEvent.preventDefault();
  };
  
  const draw = ({nativeEvent}) => {
      if(!isDrawing) {
          return;
      }
      
      const {offsetX, offsetY} = nativeEvent;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
      nativeEvent.preventDefault();
  };
  
  const stopDrawing = () => {
      contextRef.current.closePath();
      setIsDrawing(false);
  };
  
  const setToDraw = () => {
    setErase(false)
    contextRef.current.globalCompositeOperation = 'source-over';
  };
  
  const setToErase = () => {
    setErase(true)
    contextRef.current.globalCompositeOperation = 'destination-out';
  };
  
    return (
      <>
        <div className="image" style={{width: 400, height: 400, margin: 0, padding: 0}}>
          
        </div>
        <canvas className="canvas" style={{width: 400, height: 400, margin: 0, padding: 0}}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        >
        </canvas>
        <div>
          <button className="draw" onClick={setToDraw}> Draw </button>
          <button className="erase" onClick={setToErase}> Erase </button>
        </div>
      </>
    )
  }

//-----------------------game 5-----------------------

let FreeDrawing = () => {
  const [ erase, setErase ] = useState(false)
  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = 900
    canvas.height = 700

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
    context.fillStyle = "azure"
    context.fillRect(0, 0, 900, 700)
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    if( erase === true){
      contextRef.current.lineWidth = 20;
    } else{
      contextRef.current.lineWidth = 5;
    }
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({nativeEvent}) => {
    if(!isDrawing) {
        return;
    }
    
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToDraw = () => {
    setErase(false)
    contextRef.current.globalCompositeOperation = 'source-over';
  };

  const setToErase = () => {
    setErase(true)
    contextRef.current.globalCompositeOperation = 'destination-out';
  };

  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute('download', 'canvas.jpg');
    let image = canvasRef.current.toDataURL('image/jpg');
    link.setAttribute('href', image);
  };

  return (
    <>
      <canvas className="canvas-free-draw" style={{width: 900, height: 700, margin: 0, padding: 0}}
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      >
      </canvas>
      <div>
        <button className="draw" onClick={setToDraw}> Draw </button>
        <button className="erase" onClick={setToErase}> Erase </button>
        <button className="download">
          <a id="download_image_link" href="download_link" onClick={saveImageToLocal}>Download Image</a>
        </button>
      </div>
    </>
  )
}


export { WordSearch, SequenceMemorization, LetterRescramble, LineDrawing, FreeDrawing };