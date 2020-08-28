package ro.msg.event.management.eventmanagementbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.msg.event.management.eventmanagementbackend.service.EmailService;

@RestController
@RequestMapping("/email")
@AllArgsConstructor
@CrossOrigin
public class EmailController {

    private final EmailService emailService;
    @GetMapping
    public void sendEmail(){
        emailService.sendSimpleMessage("damsa.andreea5@gmail.com","hello","hello world");
    }
}
