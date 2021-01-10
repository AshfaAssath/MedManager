package com.example.demo.controllers;

import com.example.demo.models.ConfirmationToken;
import com.example.demo.models.Student;
import com.example.demo.repository.ConfirmationRepository;
import com.example.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@CrossOrigin(origins ="http://localhost:3000")
@RequestMapping("/api/confr")
public class ConfirmationController {


    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ConfirmationRepository confirmationRepository;



    @GetMapping("/confirm")
    public ModelAndView registerUser(ModelAndView modelAndView, @Param("token") String confirmationToken){

        ConfirmationToken token = confirmationRepository.findByConfirmationToken(confirmationToken);


        if(token !=null)
        {
            Student student= studentRepository.findByEmailIgnoreCase(token.getStudent().getEmail());
            student.setActiveStatus(true);
            studentRepository.save(student);
            modelAndView.setViewName("accountVerified");
        }
        else{
            modelAndView.addObject("message","you verified you account successfully");
            modelAndView.setViewName("error");
        }
        return modelAndView;
    }

}
