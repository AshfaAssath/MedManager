package com.example.demo.twilio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/sms")
public class   Controller {

    private final com.example.demo.twilio.Service service;

    @Autowired
    public Controller(com.example.demo.twilio.Service service){
        this.service=service;
    }

    @PostMapping
    public  void sendSms(@Valid @RequestBody com.example.demo.twilio.SmsRequest smsRequest){
        service.sendSms(smsRequest);
    }
}
