import axios from 'axios';
import authHeader from './auth-header';

const API_URL="http://localhost:8080/api/test/doctor/";

//prescription   pres/
//appointment     appoint/
//student        student/
//stock          stock/
//drugIssuing    drugIssuing/

class DoctorService{

getDoctorBoard =() =>{
    return axios.get(API_URL+ "doctor" ,{headers:authHeader() })
};
//stock
getStock(){
    return axios.get(API_URL+"stock/", {headers:authHeader() });
};

//appointments
getAppointments(){
    return axios.get(API_URL+"appoint/", {headers:authHeader() });
}

//drugIssuing
getDrugIssuing(){
    return axios.get(API_URL+"drugIssuing/",{headers:authHeader() });
}

createDrugIssuing(drugIssuing){
    return axios.post(API_URL+"drugIssuing/",drugIssuing,{headers:authHeader() });
}

// getDrugIssuingById(drugIssuingId){
//     return axios.get(API_URL+"drugIssuing/"+drugIssuingId,{headers:authHeader() });
// }

// updateDrugIssuing(drugIssuing,drugIssuingId){
//     return axios.put(API_URL+"drugIssuing/"+drugIssuingId,drugIssuing,{headers:authHeader() });
// }

// deleteDrugIssuing(drugIssuingId){
//     return axios.delete(API_URL+"drugIssuing/"+drugIssuingId,{headers:authHeader() });
// }

//prescription
getPrescription(){
    return axios.get(API_URL+"pres/",{headers:authHeader() });
}

createPrescription(prescription){
    return axios.post(API_URL+"pres/",prescription,{headers:authHeader() });
}

getPrescriptionByStudentId(studentId)
    {
        return axios.get(API_URL+"prescription/" +studentId,{headers:authHeader() });
    }

getPrescriptionById(prescriptionId){
    return axios.get(API_URL+"pres/" +prescriptionId,{headers:authHeader() });
}

updatePrescription(prescription,prescriptionId){
    return axios.put(API_URL+"pres/"+prescriptionId,prescription,{headers:authHeader() });
}

deletePrescription(prescriptionId){
    return axios.delete(API_URL+"pres/"+prescriptionId,{headers:authHeader() });
}

//medicals 
getMedicals(){
    return axios.get(API_URL+ "med/" ,{headers:authHeader() })
};

createMedical(medical){
    return axios.post(API_URL+"med/",medical,{headers:authHeader() });
}

getMedicalById(medicalId){
    return axios.get(API_URL+"med/"+medicalId,{headers:authHeader() });
}

getMedicalsByStudentId(studentId)
{
    return axios.get(API_URL+"medical/"+studentId,{headers:authHeader() });
}

getMedicalsByFacultyAcedemicYearStudentId(faculty,acedemicYear,studentId){
    return axios.get(API_URL+"medical/"+faculty+"/"+acedemicYear+"/"+studentId,{headers:authHeader() });
}
//TODO: student

getStudents(){
    return axios.get(API_URL+"student/",{headers:authHeader() });
}

getStudentById(studentId){
    return axios.get(API_URL+"student/" +studentId,{headers:authHeader() });
}
//sms
createSms(sms){
    return axios.post(API_URL+"sms/",sms);
}

//
getTempDetailsById(tempId)
{
    return axios.get(API_URL+"temp/"+tempId,{headers:authHeader() })
}

}

export default new DoctorService();