package ro.msg.event.management.eventmanagementbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ro.msg.event.management.eventmanagementbackend.repository.PictureRepository;

@Service
@RequiredArgsConstructor
public class PictureService {

    private final PictureRepository pictureRepository;
}
