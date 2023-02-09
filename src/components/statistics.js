import "./statistics.css"
import { useState } from "react";
import { classes, classViewing, viewClass, studentViewing, viewStudent } from "./backend/data"
import WordSearchChart from "./charts/wordSearchCharts";
import SequenceMemorizationChart from "./charts/sequenceMemorizationCharts";
import LetterRescrambleChart from "./charts/letterRescrambleCharts";
import RedrawChart from "./charts/redrawCharts";

function StatisticsPage() {
  const [ render, setRender ] = useState(1)

  function rerender(){
    setRender(num => -(num))
  }

  return (
    <div>
      <div className="right-tab">
        <div className="right-tab-holder">
          <h2> Class Name: </h2>
          <button className="class-name"> {classes[classViewing].name} </button>
          <h2> Student Name: </h2>
          <button className="student-name"> {classes[classViewing].studentsList[studentViewing].name} </button>
        </div>
      </div>
      <div className="statistics-body">
        <button className="statistics-games-1">
          <div className="statistics-games-1-holder">
            <button className="statistics-games-1-stats"> 
              <h2 style={{color: "black", textAlign: "left", margin: 5}}> Word Search {classes[classViewing].studentsList[studentViewing].matchingAndDrawing.wordSearch.exercises.length}</h2>
              <WordSearchChart />
            </button>
            <button className="statistics-games-1-stats">
              <h2 style={{color: "black", textAlign: "left", margin: 5}}> Sequence Memorization {classes[classViewing].studentsList[studentViewing].matchingAndDrawing.sequenceMemorization.exercises.length} </h2>
              <SequenceMemorizationChart />
            </button>
            <button className="statistics-games-1-stats">
              <h2 style={{color: "black", textAlign: "left", margin: 5}}> Letter Rescramble {classes[classViewing].studentsList[studentViewing].matchingAndDrawing.LetterRescramble.exercises.length} </h2>
              <LetterRescrambleChart />
            </button>
            <button className="statistics-games-1-stats">
              <h2 style={{color: "black", textAlign: "left", margin: 5}}> Redraw </h2>
              <RedrawChart />
            </button>
          </div>
        </button>
        <button className="statistics-games-2">
          <div className="statistics-games-2-holder">
            <button className="statistics-games-2-stats">
              <h2 style={{color: "black", textAlign: "left", margin: 5}}> Something </h2>

            </button>
            <button className="statistics-games-2-stats">
              <h2 style={{color: "black", textAlign: "left", margin: 5}}> Something </h2>
            
            </button>
            <button className="statistics-games-2-stats">
              <h2 style={{color: "black", textAlign: "left", margin: 5}}> Something </h2>
            
            </button>
          </div>
        </button>
      </div>
    </div>
  );
}

export {StatisticsPage}