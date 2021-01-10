package com.example.demo.controllers;

import com.example.demo.models.*;
import com.example.demo.payload.request.LoginRequest;
import com.example.demo.payload.request.SignupRequest;
import com.example.demo.payload.response.JwtResponse;
import com.example.demo.payload.response.MessageResponse;
import com.example.demo.repository.ConfirmationRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.jwt.JwtUtils;
import com.example.demo.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ConfirmationRepository confirmationRepository;

@PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){

        Authentication authentication=authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt =jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails=(UserDetailsImpl) authentication.getPrincipal();
        List<String> roles= userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                                             userDetails.getId(),
                                             userDetails.getUsername(),
                                             userDetails.getEmail(),
                                             roles));
    }

    @PostMapping("/signup")
public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest){
    if(userRepository.existsByUsername(signupRequest.getUsername())){
        return ResponseEntity
                .badRequest()
                .body(new MessageResponse("Error: Username is already taken!"));
    }

    if(userRepository.existsByEmail(signupRequest.getEmail())){
        return ResponseEntity
                .badRequest()
                .body(new MessageResponse("Error: Email is already in use!"));
    }

    //create a new user's account
    User user= new User(signupRequest.getUsername(),
            signupRequest.getEmail(),
            encoder.encode(signupRequest.getPassword()));

//    Set<String> strRoles= signupRequest.getRole();
    Set<Role> roles= new HashSet<>();
        String UserRole= signupRequest.getUsername();

//    if(strRoles ==null){
//        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
//                .orElseThrow(() ->new RuntimeException("Error: Role is not found."));
//            roles.add(userRole);
//    }else{
//        strRoles.forEach(role ->{
            switch(UserRole) {
                case "Admin":
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error:Role is not found."));
                            roles.add(adminRole);
                            break;

                case "Pharmacist":
                    Role pharmacistRole = roleRepository.findByName(ERole.ROLE_PHARMACIST)
                            .orElseThrow(() -> new RuntimeException("Error:Role is not found."));
                    roles.add(pharmacistRole);
                    break;

                case "Receptionist":
                    Role receptionistRole = roleRepository.findByName(ERole.ROLE_RECEPTIONIST)
                            .orElseThrow(() -> new RuntimeException("Error:Role is not found."));
                    roles.add(receptionistRole);
                    break;

                case "Phi":
                    Role phiRole = roleRepository.findByName(ERole.ROLE_PHI)
                            .orElseThrow(() -> new RuntimeException("Error:Role is not found."));
                    roles.add(phiRole);
                    break;

                case "Doctor":
                    Role doctorRole = roleRepository.findByName(ERole.ROLE_DOCTOR)
                            .orElseThrow(() -> new RuntimeException("Error:Role is not found."));
                    roles.add(doctorRole);
                    break;

                default:
                    Role userRole =roleRepository.findByName(ERole.ROLE_USER)
                            .orElseThrow(()-> new RuntimeException("Error:Role is not found."));
                    roles.add(userRole);
//            }
//        });
    }
    user.setRoles(roles);
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
}


}
