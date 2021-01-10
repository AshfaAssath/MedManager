package com.example.demo.controllers;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.models.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/test/doctor")
public class DoctorController {
//
    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private DrugIssuingRepository drugIssuingRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private TempDetailsRepository tempDetailsRepository;

    @Autowired
    private MedicalRepository medicalRepository;

    @Autowired
    private DrugRepository drugRepository;

    private final com.example.demo.twilio.Service service;

    @Autowired
    public DoctorController(com.example.demo.twilio.Service service){

        this.service=service;
    }

    //get all appointments
    @GetMapping("/appoint/")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    //get appointments by id
    @GetMapping("/appoint/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Integer id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment doesn't exist with id" + id));
        return ResponseEntity.ok(appointment);
    }

    //get all prescription
    @GetMapping("/pres/")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

//
//    //get prescription by student Id
    @GetMapping("/prescription/{studentId}")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<Prescription> getAllPrescriptionsByStudentId(@PathVariable String studentId ){
        return  prescriptionRepository.findAllByStudentId(studentId);

    }
//    @GetMapping("/medical/{faculty}/{acedemicYear}/{studentId}")
//    @PreAuthorize("hasRole('DOCTOR')")
//    public List<Medicals> getAllPrescriptionsByFacultyAcedemicYearStudentId(@PathVariable String faculty,@PathVariable Integer acedemicYear,@PathVariable String studentId ){
//        return  medicalRepository.findAllByFacultyAndAcedemicYearAndStudentId(faculty,acedemicYear,studentId);
//
//    }



    //create a prescription
    @PostMapping("/pres/")
    @PreAuthorize("hasRole('DOCTOR')")
    public Prescription createPrescription(@RequestBody Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    //get prescription by id
    @GetMapping("/pres/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Prescription> getPrescriptionById(@PathVariable Integer id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription doesn't exist with id" + id));
        return ResponseEntity.ok(prescription);
    }

    //update prescription
    @PutMapping("/pres/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Prescription> updatePrescription(@PathVariable Integer id, @RequestBody Prescription prescrip) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription doesn't exist with id" + id));

        prescription.setIssuedDate(prescrip.getIssuedDate());
        prescription.setDiagnosis(prescrip.getDiagnosis());
        prescription.setStudent(prescrip.getStudent());
        prescription.setTreatment(prescrip.getTreatment());
        prescription.setPresStatus(prescrip.getPresStatus());


        Prescription updatePrescription = prescriptionRepository.save(prescription);
        return ResponseEntity.ok(updatePrescription);
    }

    //delete prescription
    @DeleteMapping("/pres/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Map<String, Boolean>> deletePrescription(@PathVariable Integer id) {
        Prescription prescription = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription doesn't exist with id" + id));

        prescriptionRepository.delete(prescription);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    //view students
    @GetMapping("/student/")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    //get student by id
    @GetMapping("/student/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Student> getStudentById(@PathVariable String id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student doesn't exist with id" + id));
        return ResponseEntity.ok(student);
    }


    //get all drug issuing details
    @PreAuthorize("hasRole('DOCTOR')")
    @GetMapping("/drugIssuing")
    public List<DrugIssuing> getAllDrugIssuing() {
        return drugIssuingRepository.findAll();
    }

    //create a drug issuing detail
    @PostMapping("/drugIssuing")
    @PreAuthorize("hasRole('DOCTOR')")
    public DrugIssuing createDrugIssuing(@RequestBody DrugIssuing drugIssuing) {
        return drugIssuingRepository.save(drugIssuing);
    }

    //view stock
    @GetMapping("/stock/")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<Drug> getAllDrugNames() {
        return drugRepository.findAll();
    }




    //medicals

    // get all medicals
    @GetMapping("/med/")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<Medicals> getAllMedicals() {
        return medicalRepository.findAll();
    }

   //  getmedicals by id

    @GetMapping("/med/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<Medicals> getMedicalById(@PathVariable String id) {
        Medicals medicals = medicalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medicals doesn't exist with id" + id));
        return ResponseEntity.ok(medicals);
    }

    //create medicals
    @PostMapping("/med/")
    @PreAuthorize("hasRole('DOCTOR')")
    public Medicals createMedical(@RequestBody Medicals medicals) {

        return medicalRepository.save(medicals);
    }

    //get medicals by studentId

    @GetMapping("/medical/{studentId}")
    @PreAuthorize("hasRole('DOCTOR')")
    public List<Medicals> getAllMedicalsByStudentId(@PathVariable String studentId ){
        return  medicalRepository.findAllByStudentId(studentId);

    }


    //Sms
    @PostMapping("/sms")
    public  void sendSms(@Valid @RequestBody com.example.demo.twilio.SmsRequest smsRequest){
        service.sendSms(smsRequest);
    }

    // get temp details by id
    @GetMapping(path="/temp/{id}")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<TempDetails> getTempDetailsById(@PathVariable Integer id){

        TempDetails tempDetails = tempDetailsRepository.findById(id)
                .orElseThrow(() -> new com.example.demo.exception.ResourceNotFoundException("No data entry exists with id" + id));
        return ResponseEntity.ok(tempDetails);
    }
}
