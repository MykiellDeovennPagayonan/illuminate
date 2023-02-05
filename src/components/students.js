import "./students.css";
import { useState } from "react";
import { classes, classViewing, viewClass, addStudent, removeStudent, editS, checkS, editStudents, renameStudent, viewStudent } from "./backend/data"

function StudentsPage(props) {
  const [ render, setRender ] = useState(1)

  function rerender(){
    setRender(num => -(num))
  }

  return (
    <div>
      <div className="right-tab">
        <div className="right-tab-holder">
          {classes.map((classes, index) => {
            return( <button className="class" onClick={() => {viewClass(index); rerender()}} style={index === classViewing ? {backgroundColor: "#e1c7a1"} : null}> {classes.name} </button> )
          })}
        </div>
      </div>
      <div className="students-holder">
        <h1 className="student-title"> Students </h1>
        <div className="students-holder-inner">
          {classes[classViewing].studentsList.map((students, index) => {
            if (editStudents === true){
              return (
                <button className="students">
                  <input className="change-student-name" type="text" onChange={(e) => renameStudent(e.target.value, index)} placeholder={students.name}/>
                  <button className="trash-it" onClick={() => {removeStudent(index); rerender()}}></button>
                </button>
              )
            } else{
              return ( <button className="students" onClick={() => { viewStudent(index); props.PageChange(8)}}> {students.name} </button> )
            }
          })}
          {classes[classViewing].studentsList.length < 45 ? <button className="add-student" onClick={() => {addStudent(); rerender()}}> + Add Student + </button> : null}
        </div>
        <div className="bottom-holder">
        {editStudents === false ? <button className="edit" onClick={() => {editS(); rerender()}}> </button> : <button className="check" onClick={() => {checkS(); rerender()}}> </button>}
      </div>
      </div>
    </div>
  );
}

export {StudentsPage}