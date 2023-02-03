import "./students.css";
import { useEffect, useState } from "react";
import { classes, classViewing, viewClass, addStudent  } from "./backend/data"

function StudentsPage(props) {
  const [ render, setRender ] = useState(1)

  function rerender(){
    setRender(num => -(num))
  }

  return (
    <div>
      <div className="right-tab">
        {classes.map((classes, index) => {
          return( <button className="class" onClick={() => {viewClass(index); rerender()}} style={index === classViewing ? {backgroundColor: "#e1c7a1"} : null}> {classes.name} </button> )
        })}
      </div>
      <div className="students-holder">
        <h1 className="student-title"> Students </h1>
        <div className="students-holder-inner">
          {classes[classViewing].studentsList.map((students, index) => {
            return( <button className="students"> {students.name} </button> )
          })}
          <button className="add-student" onClick={() => {addStudent(); rerender()}}> + Add Student + </button>
        </div>
      </div>
    </div>
  );
}

export {StudentsPage}