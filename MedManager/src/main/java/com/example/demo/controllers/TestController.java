package com.example.demo.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    @GetMapping("/all")
    public String allAccess(){
        return "Public Content";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess(){
        return"Admin Board";
    }

    @GetMapping("/doctor")
    @PreAuthorize("hasRole('DOCTOR')")
    public String doctorAccess(){
        return"Doctor Board";
    }

    @GetMapping("/pharmacist")
    @PreAuthorize("hasRole('PHARMACIST')")
    public String pharmacistAccess(){
        return"Pharmacist Board";
    }

    @GetMapping("/receptionist")
    @PreAuthorize("hasRole('RECEPTIONIST')")
    public String receptionistAccess(){
        return"Receptionist Board";
    }

    @GetMapping("/phi")
    @PreAuthorize("hasRole('PHI')")
    public String phiAccess(){
        return"PHI Board";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER') or hasRole('DOCTOR') or hasRole('PHARMACIST')")
    public String userAccess() {
        return "User Content.";
    }
}
