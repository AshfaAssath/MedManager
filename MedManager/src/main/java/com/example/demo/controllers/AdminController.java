package com.example.demo.controllers;


import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.models.*;
import com.example.demo.payload.response.MessageResponse;
import com.example.demo.repository.*;
//import com.example.demo.service.EmailService;
import com.example.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/test/admin")
public class AdminController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ConfirmationRepository confirmationRepository;

    @Autowired
    private EmailService emailService;


    //get all Appointments
    @GetMapping("/Appointment")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Appointment> getAllAppointments() {
        return  appointmentRepository.findAll();
    }

    //create Appointment REST API
    @PostMapping("/Appointment")
    @PreAuthorize("hasRole('ADMIN')")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    //get Appointment by id REST API
    @GetMapping("/Appointment/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Integer id) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Appointment not Exist with id :" +id));
        return ResponseEntity.ok(appointment);
    }


    @PutMapping("/appoint/{id}")
    @PreAuthorize("hasRole('ADMIN')")
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

    //delete Appointment REST API
    @DeleteMapping("/Appointment/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteAppointment(@PathVariable Integer id) {
        Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Appointment not Exist with id :" +id));

        appointmentRepository.delete(appointment);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    //student

    //get all Students
    @GetMapping("/Student")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    //create Student REST API
    //create a student
    @PostMapping("/student/")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createStudent(@Valid @RequestBody Student student) {


        if(studentRepository.existsById(student.getId())){
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Student id is already exists!"));
        }

        Student stud= new Student(student.getId(),
                student.getFirstName(),
                student.getLastName(),
                passwordEncoder.encode(student.getPassword()),
                student.getFaculty(),
                student.getAcedemicYear(),
                student.getGender(),
                student.getEmail(),
                student.getContactNumber(),
                student.getActiveStatus()
        );

        studentRepository.save(stud);


        ConfirmationToken confirmationToken= new ConfirmationToken(student);
        confirmationRepository.save(confirmationToken);
        SimpleMailMessage mailMessage= new SimpleMailMessage();
        mailMessage.setTo(student.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setFrom("ruhmedmanager@gmail.com");
        mailMessage.setText("Ruhuna Univeristy -Medical Center\nTo confirm your medical center account,please click here: "+"http://localhost:8080/api/auth/confirm?confirmationToken="+confirmationToken.getConfirmationToken()+".Use\n your student registration number as the username and password123 as the password.\nPlease contact us if you have problem at ruhmedmanager@gmail.com.\nStay healthy and safe ! ");

        emailService.sendEmail(mailMessage);
        return ResponseEntity.ok(new MessageResponse("Student registered successfully!"));
    }


    //get Student by id REST API
    @GetMapping("/Student/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Student> getStudentById(@PathVariable String id){
        Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not Exist with id :" +id));
        return ResponseEntity.ok(student);
    }

    //update Student REST API
    @PutMapping("/Student/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Student> updateStudent(@PathVariable String id, @RequestBody Student studentDetails){
        Student student= studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not Exist with id :" + id));

        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setAge(studentDetails.getAge());
        student.setFaculty(studentDetails.getFaculty());
        student.setGender(studentDetails.getGender());
        student.setEmail(studentDetails.getEmail());
        student.setAddress(studentDetails.getAddress());
        student.setContactNumber(studentDetails.getContactNumber());
        student.setStayingPlace(studentDetails.getStayingPlace());
        student.setHeight(studentDetails.getHeight());
        student.setWeight(studentDetails.getWeight());
        student.setMedicineAllergies(studentDetails.getMedicineAllergies());
        student.setFoodAllergies(studentDetails.getFoodAllergies());
        student.setChronicDisease(studentDetails.getChronicDisease());

        Student updatedStudent = studentRepository.save(student);
        return ResponseEntity.ok(updatedStudent);
    }

    //delete Student REST API
    @DeleteMapping("/Student/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable String id){
        Student student = studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student not Exist with id :" +id));

        studentRepository.delete(student);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    //user

    //get all Users
    @GetMapping("/User")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    //create User REST API
    @PostMapping("/User")
    @PreAuthorize("hasRole('ADMIN')")
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }

    //get User by id REST API
    @GetMapping("/User/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not Exist with id :" +id));
        return ResponseEntity.ok(user);
    }

    //update User REST API
    @PutMapping("/User/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not Exist with id :" +id));

        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setRoles(userDetails.getRoles());
        user.setEmail(userDetails.getEmail());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));


        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    //delete User REST API
    @DeleteMapping("/User/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not Exist with id :" +id));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
