import React, { useRef, useEffect, useState } from "react"
import "./games copy.css";

//-----------------------game 1-----------------------

function WordSearch() { 
  let words = ["cat", "dog", "sun", "man", "top", "map", "pen", "box", "hat", "car", "bus", "leg", "fun", "run", "bun", "wet", "red", "big", "mix", "six", "yes", "lip", "cup", "tap", "rot", "fun", "sat", "wet", "wag", "hot", "wet", "fog", "jog", "gas", "tag", "act", "bag", "get", "pig", "dig", "fit", "kit", "nit", "sit", "bit", "kit", "zip", "yam", "yap", "yum"]
  
  let indexes = []
  let numWords = 3
  const rows = 10
  const columns = 8

  const [ wordsChosen, SetWordsChosen] = useState([])

  function chooseWords() {
    let wordsChosenInitial = []
    for(let i = 0; i < numWords; i++){
      let randomWordIndex = Math.floor(Math.random()*words.length)
    }
  }
  
  return (
    <>

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