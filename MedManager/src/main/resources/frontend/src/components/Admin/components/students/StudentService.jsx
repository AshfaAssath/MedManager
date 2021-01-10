import axios from 'axios';

const REST_API_URL = "http://localhost:8080/api/v1/Student"

class StudentService{

    StudentService(){

    }

    getStudents(){
        return axios.get(REST_API_URL);
    }

    createStudent(student){
        return axios.post(REST_API_URL, student)
    }

    getStudentById(studentId){
        return axios.get(REST_API_URL + '/' + studentId);
    }

    updateStudent(student, studentId){
        return axios.put(REST_API_URL + '/' + studentId, student);
    }

    deleteStudent(studentId){
        return axios.delete(REST_API_URL + '/' +studentId)
    }
}

export default new StudentService;