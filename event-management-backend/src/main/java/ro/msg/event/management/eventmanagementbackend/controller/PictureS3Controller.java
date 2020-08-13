package ro.msg.event.management.eventmanagementbackend.controller;


import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
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
@PropertySource("classpath:aws.properties")
@RequiredArgsConstructor
public class PictureS3Controller {

    private final PictureS3Service pictureS3Service;

    @Value("${accessKey}")
    private String accessKey;

    @Value("${secretKey}")
    private String secretKey;

    @Value("${bucketName}")
    private String bucketName;

    @PostMapping
    public List<URL> getPresignedUrl(@RequestBody PictureDTO pictureDTO) {


        List<String> objectKeys = pictureDTO.getPicturesToSave();
        List<String> picturesToDeleteUrls = pictureDTO.getPicturesToDelete();


        AWSCredentials credentials = new BasicAWSCredentials(
                accessKey,
                secretKey
        );

        AmazonS3 s3Client = AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.EU_WEST_1)
                .build();

        pictureS3Service.deleteFromS3(picturesToDeleteUrls,bucketName,s3Client);

        return pictureS3Service.getPresignedUrls(objectKeys, bucketName, s3Client);

    }
}
