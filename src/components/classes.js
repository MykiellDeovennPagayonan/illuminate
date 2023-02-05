import "./classes.css"
import { useState } from "react";
import { addClass, deleteClass, classes, editC, checkC, renameClass, editClasses, viewClass } from "./backend/data";

function Classes(props) {
  const [ render, setRender ] = useState(1)

  function rerender(){
    setRender(num => -(num))
  }

  return (
    <div className="component-holder">
      <div className="classes-holder">
        {classes.map((classes, index) => {
          if (editClasses === true){
            return(
              <button className="classes">
                <input className="change-class-name" type="text" onChange={(e) => renameClass(e.target.value, index)} placeholder={classes.name}/>
                <div className="line"></div>
                <button className="classes-info-number"> Number of Students: {classes.studentsList.length} </button>
                <button className="trash" onClick={() => {deleteClass(index); rerender()}}></button>
              </button>
            )
          } else {
            return(
              <button className="classes" onClick={() => { viewClass(index); props.PageChange(7)}}>
                <button className="classes-info-name"> {classes.name} </button>
                <div className="line"></div>
                <button className="classes-info-number"> Number of Students: {classes.studentsList.length} </button>
                <button className="trash-not"></button>
              </button>
            )
          }
        })}
        {classes.length < 10 ? <button className="add-classes" onClick={() => {addClass(); rerender()}}> + Create New Class + </button> : null}
      </div>
      <div className="bottom-holder">
        {editClasses === false ? <button className="edit" onClick={() => {editC(); rerender()}}> </button> : <button className="check" onClick={() => {checkC(); rerender()}}> </button>}
      </div>
    </div>
  );
}

export { Classes }