import "./statistics.css"
import { useState } from "react";
import { classes, classViewing, viewClass, studentViewing, viewStudent } from "./backend/data"

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
    </div>
  );
}

export {StatisticsPage}