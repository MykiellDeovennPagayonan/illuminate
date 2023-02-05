import React, { useRef, useEffect, useState } from "react"
import "./games.css";

//-----------------------game 1-----------------------

function WordSearch() { 
  let words = ["cat", "dog", "sun", "man", "top", "map", "pen", "box", "hat", "car", "bus", "leg", "fun", "run", "bun", "wet", "red", "big", "mix", "six", "yes", "lip", "cup", "tap", "rot", "fun", "sat", "wet", "wag", "hot", "wet", "fog", "jog", "gas", "tag", "act", "bag", "get", "pig", "dig", "fit", "kit", "nit", "sit", "bit", "kit", "zip", "yam", "yap", "yum"]
  const [ wordSearch, setWordSearch] = useState([])
  
  let indexes = []
  let numWords = 3
  const rows = 14
  const columns = 12

  let wordsUse;

  function randomWords(){
    while(true){
      let good = true
      let grid = []
      wordsUse = {
        word: [],
        xStart: [],
        yStart: [],
        arrangement: [],
        xEnd: [],
        yEnd: [],
        activation: []
      }
  
      for (let c = 0; c < columns; c++){
        grid.push([])

        for (let r = 0; r < rows; r++){
          grid[c].push('-')
        }
      }
  
      for (let i = 0; i < numWords; i++){

        wordsUse.activation.push(false)
  
        let chosen = Math.floor(Math.random()*words.length)
        wordsUse.word.push(words[chosen])
        let arrangeID = Math.floor(Math.random()*4)
        wordsUse.arrangement.push(arrangeID) // 0 is down, 1 is up, 2 is right, 3 is left
  
        let x;
        let y;
  
        do {
          x = Math.floor(Math.random()*rows)
          y = Math.floor(Math.random()*columns)
  
        } while ((arrangeID === 0 && y > columns-wordsUse.word[i].length-1) || (arrangeID === 1 && y < wordsUse.word[i].length-1) || (arrangeID === 2 && x > rows-wordsUse.word[i].length-1) || (arrangeID === 3 && x < wordsUse.word[i].length-1))
          
        wordsUse.xStart.push(x)
        wordsUse.yStart.push(y)
        console.log(wordsUse.word[i].length)
      }
  
      for (let i = 0; i < numWords; i++){
        for (let j = 0; j < wordsUse.word.length; j++){
          if (grid[wordsUse.yStart[i]][wordsUse.xStart[i]] === "-" || grid[wordsUse.yStart[i]][wordsUse.xStart[i]] === wordsUse.word[i][j]){
            grid[wordsUse.yStart[i]][wordsUse.xStart[i]] = wordsUse.word[i][j]
          } else {
            good = false
          }
  
          if (wordsUse.arrangement[i] === 0){
            wordsUse.yStart[i]++
          } else if (wordsUse.arrangement[i] === 1){
            wordsUse.yStart[i]--
          } else if (wordsUse.arrangement[i] === 2){
            wordsUse.xStart[i]++
          } else {
            wordsUse.xStart[i]--
          }
        }

        if (wordsUse.arrangement[i] === 0){
          wordsUse.xEnd.push(wordsUse.xStart[i])
          wordsUse.yEnd.push(wordsUse.yStart[i]-1)
        } else if (wordsUse.arrangement[i] === 1){
          wordsUse.xEnd.push(wordsUse.xStart[i])
          wordsUse.yEnd.push(wordsUse.yStart[i]+1)
        } else if (wordsUse.arrangement[i] === 2){
          wordsUse.xEnd.push(wordsUse.xStart[i]-1)
          wordsUse.yEnd.push(wordsUse.yStart[i])
        } else {
          wordsUse.xEnd.push(wordsUse.xStart[i]+1)
          wordsUse.yEnd.push(wordsUse.yStart[i])
        }
      }

      for (let i = 0; i < numWords; i++){
        for (let j = 0; j < wordsUse.word.length; j++){
          if (wordsUse.arrangement[i] === 0){
            wordsUse.yStart[i]--
          } else if (wordsUse.arrangement[i] === 1){
              wordsUse.yStart[i]++
          } else if (wordsUse.arrangement[i] === 2){
              wordsUse.xStart[i]--
          } else {
              wordsUse.xStart[i]++
          }
        }
    }
  
    if (good === true){
      break
    }
  }
    return wordsUse
  }

  const [ wordsRandom, setWordsRandom] = useState(randomWords())


  function randomLettersPerm(){
    console.log("heyyyyy")
    let letters = []
    for (let i = 0; i < columns*rows; i++){
      letters.push(String.fromCharCode(Math.floor(Math.random()*26) + 97))
    }
    return letters
  }

  const [ randomLetters, setRandomLetters ] = useState(randomLettersPerm())

  console.log(randomLetters)

  function createSearch(index){
    let boxes = []
    for(let i = 0; i < columns*rows; i++){
      boxes.push({letters: randomLetters[i], activation: false})
    }

    for (let i = 0; i < numWords; i++){
      for (let j = 0; j < wordsRandom.word[i].length; j++){

        if (wordsRandom.arrangement[i] === 0){
          boxes[(wordsRandom.yStart[i]+j)*rows + wordsRandom.xStart[i]].letters = wordsRandom.word[i][j]
        } else if (wordsRandom.arrangement[i] === 1){
          boxes[(wordsRandom.yStart[i]-j)*rows + wordsRandom.xStart[i]].letters = wordsRandom.word[i][j]
        } else if (wordsRandom.arrangement[i] === 2){
          boxes[wordsRandom.yStart[i]*rows + (wordsRandom.xStart[i]+j)].letters = wordsRandom.word[i][j]
        } else {
          boxes[wordsRandom.yStart[i]*rows + (wordsRandom.xStart[i]-j)].letters = wordsRandom.word[i][j]
        }

      }
    }

    if (index !== null){
      for (let i = 0; i < index.length; i++){
        boxes[index[i]].activation = true
      }
      for (let i = 0; i < index.length; i++){
        boxes[index[i]].activation = true
      }
    }

    setWordSearch(boxes)
  }

  useEffect(() => {
    createSearch(null)
  }, [])

  function startIndex(indexS){
    indexes[0] = indexS
  }

  function endIndex(indexE){
    indexes[1] = indexE
    createSearch(indexes)
  }

  function checkWord(){
    for (let i = 0; i < numWords; i++){
      if(wordSearch[(wordsRandom.yStart[i])*rows + wordsRandom.xStart[i]].activation === true && wordSearch[(wordsRandom.yEnd[i])*rows + wordsRandom.xEnd[i]].activation === true){
        let wordIni = wordsRandom
        wordIni.activation[i] = true
        setWordsRandom(wordIni)
        
        let x = 0
        let y = 0

        for (let j = 0; j < wordsRandom.word[i].length; j++){
          indexes.push((wordsRandom.yStart[i]+y)*rows + wordsRandom.xStart[i]+x)

          if (wordsRandom.arrangement[i] === 0){
            y++
          } else if (wordsRandom.arrangement[i] === 1){
            y--
          } else if (wordsRandom.arrangement[i] === 2){
            x++
          } else {
            x--
          }
        }
      }
    }
    createSearch(indexes)
  }
  
  return (
    <>
      <div className="word-search-words-grid">
        {wordsRandom.word.map((word, index) => {
          if (wordsRandom.activation[index] === false){
            return(<button className="word-search-words"> {word} </button>)
          } else {
            return(<button className="word-search-words-activated"> {word} </button>)
          }
        })}
        <button className="word-search-words" style={{width: 260, backgroundColor: "#E7BF83"}} onClick={() => checkWord()}> check </button>
      </div>
      <div className="grid">
        {wordSearch.map((box, index) => {
          if (box.activation === false){
            return (<button className="grid-box" onMouseDown={() => startIndex(index)} onMouseUp={() => {endIndex(index)}}> {box.letters} </button>)
          } else {
            return (<button className="grid-box-enlarged"> {box.letters} </button>)
          }

        })}
      </div>
    </>
  );
}

//-----------------------game 2-----------------------

function SequenceMemorization() {
  const [ boxes, setBoxes ] = useState([])
  const [ lettersIn, SetLettersIn ] = useState([])
  const [ show, setShow ] = useState(true)
  let numLetters = 4
  let lettersVault = ["p", "q", "t", "l", "z", "r", "b", "d"]

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
      SetLettersIn([])
      SetRandomizedLetters(randomLetters)
      SetRandomizedWord(randomWord)
      createBoxLetters()
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      checkMatch()
    }, 100)
    return () => clearInterval(timer)

  }, [checkMatch])

  return (
    <>
      <button className="new-set" onClick={() => doShow()}> show again </button>
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
    </>
  );
}

//-----------------------game 3-----------------------

function LetterRescramble() {
  const numWords = 4
  let words = ["cat", "dog", "sun", "man", "top", "map", "pen", "box", "hat", "car", "bus", "leg", "fun", "run", "bun", "wet", "red", "big", "mix", "six", "yes", "lip", "cup", "tap", "rot", "fun", "sat", "wet", "wag", "hot", "wet", "fog", "jog", "gas", "tag", "act", "bag", "get", "pig", "dig", "fit", "kit", "nit", "sit", "bit", "kit", "zip", "yam", "yap", "yum"]
  let lettersVault;
  const [ lettersIn, SetLettersIn ] = useState([])

  function randomWords(){
    let wordsChosenInitial = []

    for(let i = 0; i < numWords; i++){
      let wordsIndexRandom = Math.floor(Math.random()*words.length)
      wordsChosenInitial.push(words[wordsIndexRandom])
  
    }
  
    lettersVault = []
  
    for(let i = 0; i < numWords; i++){
      for(let j = 0; j < wordsChosenInitial[i].length; j++){
        lettersVault.push(wordsChosenInitial[i][j])
      }
    }
    SetRandomizedLetters(randomLetters)
    return wordsChosenInitial
  }

  function randomLetters(){
    let boxesInitial = []
    while (lettersVault.length > 0){
      let wordsIndexRandom = Math.floor(Math.random()*lettersVault.length)
      boxesInitial.push(lettersVault[wordsIndexRandom])
      lettersVault.splice(wordsIndexRandom, 1)
    }
    return boxesInitial
  }

  const [ randomizedLetters, SetRandomizedLetters] = useState([])

  const [ boxes, setBoxes ] = useState([])

  const [ wordsChosen, setWordsChosen] = useState(randomWords)

  function newSet(){
    let newSetInitial = randomWords()
    setWordsChosen(newSetInitial)
  }

  function createBoxLetters(){
    let boxesInitial = []
    for (let i = 0; i < randomizedLetters.length; i++){
      boxesInitial.push(randomizedLetters[i])
    }
    setBoxes(boxesInitial)
  }

  useEffect(() => {
    createBoxLetters()
  }, [randomizedLetters])

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
        setWordsChosen(wordsChosenInitial)
        let lettersInInitial = []
        SetLettersIn(lettersInInitial)
      }
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      completeWordCheck()
    }, 1000)
    return () => clearInterval(timer)

  }, [completeWordCheck()])

  return (
    <>
      <button className="new-set" onClick={() => newSet()}> new set </button>
      <div className="box-input">
      {lettersIn.map((box, index) => {
            return (<button className="box-letters-smaller" onClick={() => removeLetter(index)}> {box} </button>)
        })}
      </div>
      <div className="series-words">
        {wordsChosen.map((word) => {
              return (<button className="words"> {word} </button>)
          })}
      </div>
      <div className="series-box-letters">
        {boxes.map((box, index) => {
            return (<button className="box-letters-smaller" onClick={() => {addLetter(index); completeWordCheck()}}> {box} </button>)
        })}
      </div>
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