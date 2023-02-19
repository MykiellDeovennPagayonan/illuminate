let classes = [{name: "Class 1", studentsList: []}]
let classViewing = 0
let studentViewing = 0
let editClasses = false
let editStudents = false

function addClass(){
  classes.push({name: "Class", studentsList: []})
}

function deleteClass(index){
  classes.splice(index, 1)
}

function editC(){
  editClasses = true
}

function checkC(){
  editClasses = false
}

function editS(){
  editStudents = true
}

function checkS(){
  editStudents = false
}

function renameClass(data, index){
  classes[index].name = data
}

function renameStudent(data, index){
  classes[classViewing].studentsList[index].name = data
}

function viewClass(index){
  classViewing = index
}

function viewStudent(index){
  studentViewing = index
}

function prevStudent(){
  if (studentViewing > 0){
    studentViewing--
  } else {
    studentViewing = classes[classViewing].studentsList.length - 1
  }
}

function nextStudent(){
  if (studentViewing < classes[classViewing].studentsList.length - 1){
    studentViewing++
  } else {
    studentViewing = 0
  }
}

function addStudent(){
  classes[classViewing].studentsList.push({
    name: undefined,
    age: undefined,
    diagnosis: "not diagnosed",
  
    matchingAndDrawing: {
  
      wordSearch: {
        exercises: []
      },
  
      sequenceMemorization: {
        exercises: []
      },
  
      letterRescramble: {
        exercises: []
      },
  
      redraw: {
        exercises: []
      },
  
      drawingcanvas: {
        exercises: []
      }
    }, 
  
    phoneticRecognition: {
      letterRegcognition: {
        accuracy: []
      },
  
      syllableRecognition: {
        accuracy: []
      },
  
      wordRecognition: {
        accuracy: []
      }
    }
  })
}

addStudent()

function removeStudent(index){
  classes[classViewing].studentsList.splice(index, 1)
}

export { classes, classViewing, studentViewing, addClass, deleteClass, editC, checkC, editS, checkS, renameClass, viewClass, viewStudent, prevStudent, nextStudent, addStudent, removeStudent, renameStudent, editClasses, editStudents }