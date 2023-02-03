function sum(array){
  let sum = 0;
  for (let i = 0; i < array.length; i++){
    sum += Number(array[i])
  }
  return sum;
}

let student = {
  name: undefined,
  age: undefined,
  diagnosis: "not diagnosed",

  matchingAndDrawing: {

    wordSearch: {
      exercises: [],
      time: []
    },

    sequenceMemorization: {
      exercises: [],
      time: []
    },

    LetterRescramble: {
      exercises: [],
      time: []
    },

    redraw: {
      exercises: [],
      time: []
    },

    drawingcanvas: {
      drawings: [],
      time: []     
    }
  }, 

  shawdows: {
    shadowBuilding: {
      exercises: [],
      accuracy: []
    },

    handShadowPlay: {
      exercises: [],
      accuracy: []
    },

    shadowinTheWall: {
      exercises: [],
      accuracy: []
    }
  }
}

let classes = [{name: "Class 1", studentsList: [student], edit: false}]
let classViewing = 0

function addClass(){
  classes.push({name: undefined, studentsList: [student], edit: true})
}

function edit(index){
  classes[index].edit = true
}

function check(index){
  classes[index].edit = false
}

function rename(data, index){
  classes[index].name = data
}

function viewClass(index){
  classViewing = index
}

function addStudent(){
  classes[classViewing].studentsList.push(student)
}

export { classes, classViewing, addClass, edit, check, rename, viewClass, addStudent }