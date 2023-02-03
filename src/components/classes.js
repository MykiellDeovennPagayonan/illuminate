import "./classes.css"
import { useEffect, useState } from "react";
import { addClass, classes, classViewing, edit, check, rename } from "./backend/data";

function Classes(props) {
  const [ render, setRender ] = useState(1)

  function rerender(){
    setRender(num => -(num))
  }

  console.log(classes.length)
  return (
    <div className="classes-holder">
      {classes.map((classes, index) => {
        if (classes.edit === true){
          return(
            <button className="classes">
              <div className="classes-info">
                <input className="change-class-name" type="text" onChange={(e) => rename(e.target.value, index)}/>
                <button className="classes-info-number"> Number of Students: {classes.studentsList.length} </button>
                <button className="check" onClick={() => {check(index); rerender()}}> </button>
              </div>

            </button>
          )
        } else {
          return(
            <button className="classes" onMouseOver={() => {classViewing(index)}} onClick={() => props.PageChange(7)}>
              <div className="classes-info">
                <button className="classes-info-name"> {classes.name} </button>
                <button className="classes-info-number"> Number of Students: {classes.studentsList.length} </button>
                <button className="edit" onClick={() => {edit(index); rerender()}}> </button>
              </div>
            </button>
          )
        }
      })}
      {classes.length < 8 ? <button className="add-classes" onClick={() => {addClass(); rerender()}}> + Create New Class + </button> : null}
    </div>
  );
}

export { Classes }