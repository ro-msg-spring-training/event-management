package ro.msg.event.management.eventmanagementbackend.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class PictureS3Service {

    public List<URL> getPresignedUrls(List<String> objectKeys, String bucketName, AmazonS3 s3Client){
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

    public void deleteFromS3(List<String> picturesToDelete,String bucketName,AmazonS3 s3Client){

        picturesToDelete.forEach(picture -> s3Client.deleteObject(bucketName,picture));
    }
}
