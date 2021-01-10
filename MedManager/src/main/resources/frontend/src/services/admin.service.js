import axios from 'axios';
import authHeader from './auth-header';

const API_URL="http://localhost:8080/api/test/admin/";

//TODO: Student

//student         student/
//prescription    pres/
//appointment     appoint/
//stock           stock/
//user            users/
//drug issuing    drugIssuing/

class AdminService{

//appointment

getAppointments(){
    return axios.get(API_URL+"Appointment/", {headers:authHeader() });
}

createAppointment(appointment){
    return axios.post(API_URL+"Appointment/",appointment,{headers:authHeader()} );
}

getAppointmentById(appointmentId){
    return axios.get(API_URL +"appoint/"+appointmentId, {headers:authHeader()} );
}

updateAppointment(appointment,appointmentId){
    return axios.put(API_URL+"appoint/"+appointmentId,appointment,{headers:authHeader() });
}

deleteAppointment(appointmentId){
    return axios.delete(API_URL+"appoint/"+appointmentId ,{headers:authHeader() });
}

 // get admin board 
getAdminBoard =() =>{
    return axios.get(API_URL+ "admin" ,{headers:authHeader() })
};



//stock

getStock(){
    return axios.get(API_URL+"stock/", {headers:authHeader() });
};

//drugIssuing
getDrugIssuing(){
    return axios.get(API_URL+"drugIssuing/",{headers:authHeader() });
}



//prescription

getPrescription(){
    return axios.get(API_URL+"pres/",{headers:authHeader() });
}

getPrescriptionById(prescriptionId){
    return axios.get(API_URL+"pres/" +prescriptionId,{headers:authHeader() });
}

//student
getAllStudents(){
    return axios.get(API_URL+"Student" ,{headers:authHeader() });
}
//create

createStudent(student){
    return axios.post(API_URL+"student/",student ,{headers:authHeader() });
}


//users

getUsers()
{
    return axios.get(API_URL+"User" ,{headers:authHeader() });
}
}

export default new AdminService();