export default class ClassService {
  static async createClass(classData) {
    try {
      // TODO: add database logic for creating class

      fetch() //something

      return {success: true, data: null, errorMessage: ""}
    } catch (error) {
      return {success: false, data: null, errorMessage: error}
    }
  }

  static async updateClass(classData) {
    // For loop the students and save the updated student data using StudentService.updateStudent(student)
  }

  static async sampleUsage() {
    // If you have classes

      const classData = {};

      await ClassService.updateClass(classData);
  }
}
