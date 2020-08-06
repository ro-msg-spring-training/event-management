package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.repository.LocationRepository;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
}
