package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.repository.SublocationRepository;

@Service
@RequiredArgsConstructor
public class SublocationService {

    private final SublocationRepository sublocationRepository;
}
