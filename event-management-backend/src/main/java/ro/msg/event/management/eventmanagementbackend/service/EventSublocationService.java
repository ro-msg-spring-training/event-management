package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.repository.EventSublocationRepository;

@Service
@RequiredArgsConstructor
public class EventSublocationService {

    private final EventSublocationRepository eventSublocationRepository;
}
