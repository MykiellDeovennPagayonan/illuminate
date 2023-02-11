import React, { useState } from 'react'
import { BackgroundHomePage, BackgroundClassesPage, BackgroundStudentsPage, BackgroundStatisticsPage, BackgroundGames1, BackgroundGames2, BackgroundGames3 } from './components/background';
import { WordSearch, SequenceMemorization, LetterRescramble, LineDrawing, FreeDrawing } from './components/games';
import { LetterRecognition, SyllableRecognition, WordRecognition } from './components/phonetic games';
import { Classes } from './components/classes';
import { StudentsPage } from './components/students';
import { StatisticsPage } from './components/statistics';
import {} from './components/games copy';

function App() {
  const [ pageNum, setPageNum ] = useState(1)
  const [ gameNum, setGameNum] = useState(1)

  return (
    <>
      {pageNum === 1 ? <div><BackgroundHomePage PageChange = {pageNum => setPageNum(pageNum)} GameChange = {gameNum => setGameNum(gameNum)}/></div>: null}
      {pageNum === 2 ? <div><BackgroundGames1 PageChange = {pageNum => setPageNum(pageNum)} GameChange = {gameNum => setGameNum(gameNum)} gameNum={gameNum}/>
        {gameNum === 1 ? <WordSearch /> : null}
        {gameNum === 2 ? <SequenceMemorization /> : null}
        {gameNum === 3 ? <LetterRescramble /> : null}
        {gameNum === 4 ? <LineDrawing /> : null}
        {gameNum === 5 ? <FreeDrawing /> : null}
      </div> : null}
      {pageNum === 3 ? <div><BackgroundGames2 PageChange = {pageNum => setPageNum(pageNum)} GameChange = {gameNum => setGameNum(gameNum)} gameNum={gameNum}/>
        {gameNum === 1 ? <LetterRecognition /> : null}
        {gameNum === 2 ? <SyllableRecognition /> : null}
        {gameNum === 3 ? <WordRecognition /> : null}
      </div>: null}
      {pageNum === 5 ? <div><BackgroundGames3 PageChange = {pageNum => setPageNum(pageNum)} />
      </div> : null}
      {pageNum === 6 ? <div><BackgroundClassesPage PageChange = {pageNum => setPageNum(pageNum)} /> <Classes PageChange = {pageNum => setPageNum(pageNum)}/>
      </div> : null}
      {pageNum === 7 ? <div><BackgroundStudentsPage PageChange = {pageNum => setPageNum(pageNum)} /> <StudentsPage PageChange = {pageNum => setPageNum(pageNum)}/>
      </div> : null}
      {pageNum === 8 ? <div><BackgroundStatisticsPage PageChange = {pageNum => setPageNum(pageNum)} /> <StatisticsPage />
      </div> : null}
    </>
  );
}

export default App;