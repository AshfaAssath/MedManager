package com.example.demo.controllers;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.models.Appointment;
import com.example.demo.models.AvailableTimeSlots;
import com.example.demo.models.Student;
import com.example.demo.models.TempDetails;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/api/test/receptionist")
public class ReceptionistController {
//
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    public MedicalRepository medicalRepository;

    @Autowired
    public AvailableTimeSlotsRepository availableTimeSlotsRepository;

    @Autowired
    public TempDetailsRepository tempDetailsRepository;

    private final com.example.demo.twilio.Service service;

    @Autowired
    public ReceptionistController(com.example.demo.twilio.Service service){

        this.service=service;
    }


    @PostMapping("/sms")
    public  void sendSms(@Valid @RequestBody com.example.demo.twilio.SmsRequest smsRequest){
        service.sendSms(smsRequest);
    }

    //get all appointments
    @GetMapping("/appoint/")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    //get appointments by date

    @GetMapping("/appointment/{date}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public List<Appointment> getAllAppoinmtentsByDate(@PathVariable Date date ){
       return  appointmentRepository.findAllByDate(date);

    }


    //create appointment
    @PostMapping("/appoint/")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    //get appointments by id
    @GetMapping("/appoint/{id}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Integer id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment doesn't exist with id" + id));
        return ResponseEntity.ok(appointment);
    }

    //update appointment
    @PutMapping("/appoint/{id}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Integer id, @RequestBody Appointment appoint) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment doesn't exist with id" + id));

        appointment.setStudent(appoint.getStudent());
        appointment.setSymptoms(appoint.getSymptoms());
        appointment.setComment(appoint.getComment());
        appointment.setTimeAllocated(appoint.getTimeAllocated());
        appointment.setDate(appoint.getDate());
        appointment.setCurrentStatus(appoint.getCurrentStatus());
        appointment.setAppointToken(appoint.getAppointToken());
        appointment.setAvailability(appoint.getAvailability());
        appointment.setEntered(appoint.getEntered());

        Appointment updateAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.ok(updateAppointment);
    }

    //delete appointments
    @DeleteMapping("/appoint/{id}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<Map<String, Boolean>> deleteAppointment(@PathVariable Integer id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment doesn't exist with id" + id));

        appointmentRepository.delete(appointment);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
   }

   //view students
   @GetMapping("/student/")
   @PreAuthorize("hasRole('RECEPTIONIST')")
   public List<Student> getAllStudent() {
       return studentRepository.findAll();
   }

    //create a student
    @PostMapping("/student/")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // get student by id
    @GetMapping(path="/student/{id}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<com.example.demo.models.Student> getStudentById(@PathVariable String id){

        com.example.demo.models.Student student = studentRepository.findById(id)
                .orElseThrow(() -> new com.example.demo.exception.ResourceNotFoundException("Student doesn't exist with id" + id));
        return ResponseEntity.ok(student);
    }

    //update student
    @PutMapping("/student/{id}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<Student> updateStudent(@PathVariable String id, @RequestBody Student stu) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student doesn't exist with id" + id));

        student.setEmail(stu.getEmail());
        student.setFirstName(stu.getFirstName());
        student.setLastName(stu.getLastName());

        Student updateStudent = studentRepository.save(student);
        return ResponseEntity.ok(updateStudent);
    }
    //get all timeslots
    @GetMapping("/timeSlots/")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public List<AvailableTimeSlots> getAllAvailableTimeSlots() {
        return availableTimeSlotsRepository.findAll();
    }

    //get timeslots by allocated time
    @GetMapping("/timeSlots/{allocatedTime}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<AvailableTimeSlots> getAvailableTimeSlotsByAllocatedTime(@PathVariable String allocatedTime){

        com.example.demo.models.AvailableTimeSlots availableTimeSlots = availableTimeSlotsRepository.findByTimeAllocated(allocatedTime)
                .orElseThrow(() -> new com.example.demo.exception.ResourceNotFoundException("No such Time slots exist with that allocated time" + allocatedTime));
        return ResponseEntity.ok(availableTimeSlots);
    }

    //update time slots
    @PutMapping("/timeSlots/{allocatedTime}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<AvailableTimeSlots> updateAvailableTimeSlots(@PathVariable String allocatedTime, @RequestBody AvailableTimeSlots availa) {
        AvailableTimeSlots availableTimeSlots = availableTimeSlotsRepository.findByTimeAllocated(allocatedTime)
                .orElseThrow(() -> new ResourceNotFoundException("No such time slots exist with that allocated time" + allocatedTime));

        availableTimeSlots.setBooked(availa.getBooked());


        AvailableTimeSlots updateTimeSlot = availableTimeSlotsRepository.save(availableTimeSlots);
        return ResponseEntity.ok(updateTimeSlot);
    }

    //view tempDetails
    @GetMapping("/temp/")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public List<TempDetails> getAllTempDetails() {
        return tempDetailsRepository.findAll();
    }

    // get temp details by id
    @GetMapping(path="/temp/{id}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<TempDetails> getTempDetailsById(@PathVariable Integer id){

        TempDetails tempDetails = tempDetailsRepository.findById(id)
                .orElseThrow(() -> new com.example.demo.exception.ResourceNotFoundException("No data entry exists with id" + id));
        return ResponseEntity.ok(tempDetails);
    }



    //update temp Details;
    //update student
    @PutMapping("/temp/{id}")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public ResponseEntity<TempDetails> updateTempDetails(@PathVariable Integer id, @RequestBody TempDetails tem) {
        TempDetails tempDetails = tempDetailsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No data entity  exists with id" + id));

        tempDetails.setAppointmentId(tem.getAppointmentId());
        tempDetails.setFaculty(tem.getFaculty());
        tempDetails.setAcedemicYear(tem.getAcedemicYear());
        tempDetails.setStudentId(tem.getStudentId());
        tempDetails.setAppointToken(tem.getAppointToken());


        TempDetails updateTempDetails = tempDetailsRepository.save(tempDetails);
        return ResponseEntity.ok(updateTempDetails);
    }
}
