package ro.msg.event.management.eventmanagementbackend.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class PictureS3Service {

    private final AmazonS3 s3Client;
    private static final String bucketName = "event-management-pictures";

    public PictureS3Service() {
        AWSCredentials credentials = new BasicAWSCredentials(
                "AKIAQMOAINUJQMNNLCEW",
                "taH1C8noBgJOlnoALM2ZWcVz+eefTSpFpxiO8kg6"
        );

       /*this.s3Client= AmazonS3ClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.US_EAST_2)
                .build();*/

        this.s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new InstanceProfileCredentialsProvider(false))
                .build();
    }


    public List<URL> getPresignedUrls(List<String> objectKeys){
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

    public void deleteFromS3(List<String> picturesToDelete){

        picturesToDelete.forEach(picture -> s3Client.deleteObject(bucketName,picture));
    }
}
