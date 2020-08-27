package ro.msg.event.management.eventmanagementbackend.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class PictureS3Service {

    private final AmazonS3 s3Client;
    private static final String bucketName = "event-management-pictures";

    final Environment env;


    public PictureS3Service(Environment env) {

        System.out.println(env.getProperty("pictureS3Service"));

        if("develop".equals(env.getProperty("pictureS3Service"))) {
            AWSCredentials credentials = new BasicAWSCredentials(
                    "",
                    ""
            );

            this.s3Client = AmazonS3ClientBuilder
                    .standard()
                    .withCredentials(new AWSStaticCredentialsProvider(credentials))
                    .withRegion(Regions.EU_WEST_1)
                    .build();
        }else{

        this.s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new InstanceProfileCredentialsProvider(false))
                .build();
        }


        this.env = env;
    }


    public List<URL> getPresignedUrls(List<String> objectKeys) {
        List<URL> presignedUrls = new ArrayList<>();
        objectKeys.forEach(objectKey -> {
            java.util.Date expiration = new java.util.Date();
            long expTimeMillis = expiration.getTime();
            expTimeMillis += 1000 * 60 * 60;
            expiration.setTime(expTimeMillis);

            GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucketName, objectKey)
                    .withMethod(HttpMethod.PUT)
                    .withExpiration(expiration);
            URL url = s3Client.generatePresignedUrl(generatePresignedUrlRequest);

            presignedUrls.add(url);

        });

        return presignedUrls;
    }

    public void deleteFromS3(List<String> picturesToDelete) {

        picturesToDelete.forEach(picture -> s3Client.deleteObject(bucketName, picture));
    }
}
