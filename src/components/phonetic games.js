import React, { useRef, useEffect, useState } from "react"
import "./phonetic games.css";
import { classes, classViewing, studentViewing } from "./backend/data";

function LetterRecognition() {
  function blank(){
    let boxesinitial = []
    for (let i = 0; i < 8 + 1; i++){
      boxesinitial.push("-")
    }
    return boxesinitial
  }

  const [ boxes, setBoxes ] = useState(blank())
  const [ letterChosen, setLetterChosen ] = useState(null)
  const numLetters = 8
  const [ letterIndex, setLetterIndex ] = useState(null)

  function newSet() {
    let letterInitial = String.fromCharCode(Math.floor(Math.random()*26) + 97)
    while (letterInitial === letterChosen) {
      letterInitial = String.fromCharCode(Math.floor(Math.random()*26) + 97)
    }

    setLetterChosen(letterInitial)

    let boxesInitial = []
    for (let i = 0; i < numLetters; i++) {
      let duplicate = false
      let randomLetterInitial;

      do {
        duplicate = false
        randomLetterInitial = String.fromCharCode(Math.floor(Math.random()*26) + 97)

        for (let j = 0; j < boxesInitial.length; j++){
          if (randomLetterInitial === boxesInitial[j]){
            duplicate = true
          }
        }

        if (randomLetterInitial === letterInitial){
          duplicate = true
        }

      } while (duplicate)

      boxesInitial.push(randomLetterInitial)
    }

    let insertLetterIndex = Math.floor(Math.random() * boxesInitial.length + 1)
    boxesInitial.splice(insertLetterIndex, 0, letterInitial)

    setBoxes(boxesInitial)
    setLetterIndex(insertLetterIndex)
  }

  function speak(){
    let msg = new SpeechSynthesisUtterance();
    msg.text = String(letterChosen);
    window.speechSynthesis.speak(msg);
  }

  return (
    <>
      <div className="boxes-holder">
      {boxes.map((letter) => {
        return (<button className="letter"> {letter} </button>)
      })}
      </div>
      <div className="buttons">
        <button className="listen" onClick={() => speak()}> Listen </button>
        <button className="next-set" onClick={() => newSet()}> Next Set </button>
      </div>
    </>
  );
}

function SyllableRecognition() {
  function blank(){
    let boxesinitial = []
    for (let i = 0; i < 24 + 1; i++){
      boxesinitial.push("-")
    }
    return boxesinitial
  }

  const [ boxes, setBoxes ] = useState(blank())

  const syllables = ["ne", "har", "te", "mu", "ni", "op", "tra", "da", "la", "si", "vi", "fa", "li", "ka", "pi", "wi", "hi", "po", "to", "no", "go", "ro", "so", "bo", "do", "jo", "mo", "yo", "lo", "zo", "wo", "ko", "fo", "vo", "co", "ho", "be", "me", "pe", "le", "ke", "se", "re", "de", "ge", "he", "fe", "ce", "oe", "je", "ze", "xe", "ye", "ve", "ae", "ee", "ie", "ue", "oi", "ai", "ei", "bi", "mi", "fi", "si", "di", "ki", "li", "xi", "yi", "vi", "mi", "ni", "bo", "fo", "so", "do", "ko", "lo", "xo", "yo", "vo", "mo", "no", "bi", "fi", "si", "di", "ki", "li", "xi", "yi", "vi", "mi", "ni", "bu", "fu", "su", "du", "ku", "gep", "zim", "lof", "ron", "ked", "nol", "fru", "vep", "hic", "qor", "tet", "nov", "uvz", "gir", "xul", "yex", "zol", "wop", "bem", "dep", "lem", "kep", "sep", "rep", "deg", "leg", "fel", "val", "mol", "nol"];

  const [ syllableChosen, setSyllableChosen ] = useState(null)
  const numSyllables = 24
  const [ syllableIndex, setSyllableIndex ] = useState(null)

  function newSet() {
    let syllableInitial = syllables[Math.floor(Math.random()*syllables.length)]
    while (syllableInitial === syllableChosen){
      syllableInitial = syllables[Math.floor(Math.random()*syllables.length)]
    }

    setSyllableChosen(syllableInitial)

    let boxesInitial = []
    for (let i = 0; i < numSyllables; i++) {
      let duplicate = false
      let randomSyllableInitial;

      do {
        duplicate = false
        randomSyllableInitial = syllables[Math.floor(Math.random()*syllables.length)]

        for (let j = 0; j < boxesInitial.length; j++){
          if (randomSyllableInitial === boxesInitial[j]){
            duplicate = true
          }
        }

        if (randomSyllableInitial === syllableInitial){
          duplicate = true
        }

      } while (duplicate)

      boxesInitial.push(randomSyllableInitial)
    }

    let insertSyllableIndex = Math.floor(Math.random() * boxesInitial.length + 1)
    boxesInitial.splice(insertSyllableIndex, 0, syllableInitial)

    setBoxes(boxesInitial)
    setSyllableIndex(insertSyllableIndex)
  }

  function speak(){
    let msg = new SpeechSynthesisUtterance();
    msg.text = String(syllableChosen);
    window.speechSynthesis.speak(msg);
  }

  return (
    <>
      <div className="boxes-holder">
        {boxes.map((syllable) => {
          return (<button className="syllables"> {syllable} </button>)
        })}
      </div>
      <div className="buttons">
        <button className="listen" onClick={() => speak()}> Listen </button>
        <button className="next-set" onClick={() => newSet()}> Next Set </button>
      </div>
    </>
  );
}

function WordRecognition() {
  function blank(){
    let boxesinitial = []
    for (let i = 0; i < 8 + 1; i++){
      boxesinitial.push("-")
    }
    return boxesinitial
  }

  const [ boxes, setBoxes ] = useState(blank())

  const syllables = ["ne", "har", "te", "mu", "ni", "op", "tra", "da", "la", "si", "vi", "fa", "li", "ka", "pi", "wi", "hi", "po", "to", "no", "go", "ro", "so", "bo", "do", "jo", "mo", "yo", "lo", "zo", "wo", "ko", "fo", "vo", "co", "ho", "be", "me", "pe", "le", "ke", "se", "re", "de", "ge", "he", "fe", "ce", "oe", "je", "ze", "xe", "ye", "ve", "ae", "ee", "ie", "ue", "oi", "ai", "ei", "bi", "mi", "fi", "si", "di", "ki", "li", "xi", "yi", "vi", "mi", "ni", "bo", "fo", "so", "do", "ko", "lo", "xo", "yo", "vo", "mo", "no", "bi", "fi", "si", "di", "ki", "li", "xi", "yi", "vi", "mi", "ni", "bu", "fu", "su", "du", "ku", "gep", "zim", "lof", "ron", "ked", "nol", "fru", "vep", "hic", "qor", "tet", "nov", "uvz", "gir", "xul", "yex", "zol", "wop", "bem", "dep", "lem", "kep", "sep", "rep", "deg", "leg", "fel", "val", "mol", "nol"];

  const [ wordChosen, setWordChosen ] = useState(null)
  const numWords = 8
  const [ wordIndex, setWordIndex ] = useState(null)

  function newSet() {
    let wordsVault = []

    for (let i = 0; i < numWords + 1; i++){
      let wordNew = ""
      for (let j = 0; j < 3; j++){
        wordNew += syllables[Math.floor(Math.random()*syllables.length)]
      }
      wordsVault.push(wordNew)
    }

    let indexWordsvalut = Math.floor(Math.random()*wordsVault.length)
    let wordInitial = wordsVault[indexWordsvalut]
    wordsVault.splice(indexWordsvalut, 1)

    setWordChosen(wordInitial)

    let boxesInitial = []
    for (let i = 0; i < numWords; i++) {
      indexWordsvalut = Math.floor(Math.random()*wordsVault.length)
      let randomWordInitial = wordsVault[indexWordsvalut]
      wordsVault.splice(indexWordsvalut, 1)

      boxesInitial.push(randomWordInitial)
    }

    let insertWordIndex = Math.floor(Math.random() * boxesInitial.length + 1)
    boxesInitial.splice(insertWordIndex, 0, wordInitial)

    setBoxes(boxesInitial)
    setWordIndex(insertWordIndex)
  }

  function speak(){
    let msg = new SpeechSynthesisUtterance();
    msg.text = String(wordChosen);
    window.speechSynthesis.speak(msg);
  }

  return (
    <>
      <div className="boxes-holder">
        {boxes.map((word) => {
          return (<button className="word"> {word} </button>)
        })}
      </div>
      <div className="buttons">
        <button className="listen" onClick={() => speak()}> Listen </button>
        <button className="next-set" onClick={() => newSet()}> Next Set </button>
      </div>
    </>
  );
}

export { LetterRecognition, SyllableRecognition, WordRecognition }