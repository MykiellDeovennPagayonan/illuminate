import React, { useRef, useEffect, useState } from "react"
import "./games copy.css";

//-----------------------game 1-----------------------

function WordSearch() { 
  let words = ["cat", "dog", "sun", "man", "top", "map", "pen", "box", "hat", "car", "bus", "leg", "fun", "run", "bun", "wet", "red", "big", "mix", "six", "yes", "lip", "cup", "tap", "rot", "fun", "sat", "wet", "wag", "hot", "wet", "fog", "jog", "gas", "tag", "act", "bag", "get", "pig", "dig", "fit", "kit", "nit", "sit", "bit", "kit", "zip", "yam", "yap", "yum"]
  
  let indexes = [[], []]
  let numWords = 3
  const rows = 10
  const columns = 8
  let repeat;

  const [ wordsChosen, SetWordsChosen] = useState([])
  const [ boxes, SetBoxes] = useState([])

  //--------------------------

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
    setLetterBackground(randomLetters())
    do{
      setWordsAndLetters()
      console.log("try")
    } while (repeat)
  }

  useEffect(() => {
    newSet()
  }, [])

  function startIndex(indexS) {
    indexes[0][0] = indexS
    console.log(indexS)
  }

  function endIndex(indexE) {
    indexes[0][1] = indexE
    console.log(indexE)
    refreshBoard()
  }

  function refreshBoard() {
    let boxesInitial = [...boxes]
    for (let i = 0; i < rows*columns; i++){
      boxesInitial[i].activation = false
    }
    boxesInitial[indexes[0][0]].activation = true
    boxesInitial[indexes[0][1]].activation = true
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
          console.log("hi")
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
    console.log(wordsChosenInitial)
    SetWordsChosen(wordsChosenInitial)
    activateCompleteLetters()
  }

  function activateCompleteLetters(){
    let boxesInitial = [...boxes]
    for (let i = 0; i < wordsChosen.length; i++){
      if (wordsChosen[i].activation === true){
        let xWrite = wordsChosen[i].xStart
        let yWrite = wordsChosen[i].yStart
        for (let j = 0; j < wordsChosen[i].word.length; j++){
          boxesInitial[yWrite*rows + xWrite].activation = true
          console.log("hi")
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
    </>
  );
}

//-----------------------game 2-----------------------

function SequenceMemorization() {
  

  return (
    <>
    </>
  );
}

//-----------------------game 3-----------------------

function LetterRescramble() {

  return (
    <>

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