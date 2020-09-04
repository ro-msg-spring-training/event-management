package ro.msg.event.management.eventmanagementbackend.controller;


import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.msg.event.management.eventmanagementbackend.controller.dto.PictureDTO;
import ro.msg.event.management.eventmanagementbackend.service.PictureS3Service;

import java.net.URL;
import java.util.List;


@RestController
@RequestMapping("/pictures")
@RequiredArgsConstructor
public class PictureS3Controller {

    private final PictureS3Service pictureS3Service;


    private String bucketName = "event-management-pictures";

    @PostMapping
    public List<URL> getPresignedUrl(@RequestBody PictureDTO pictureDTO) {

        List<String> objectKeys = pictureDTO.getPicturesToSave();
        List<String> picturesToDeleteUrls = pictureDTO.getPicturesToDelete();


        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new InstanceProfileCredentialsProvider(false))
                .build();

        pictureS3Service.deleteFromS3(picturesToDeleteUrls,bucketName,s3Client);

        return pictureS3Service.getPresignedUrls(objectKeys, bucketName, s3Client);

    }
}
