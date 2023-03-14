package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.service.FileService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Service
@Slf4j
@AllArgsConstructor
public class FileServiceImpl implements FileService {

    @Override
    public byte[] getMemeFromResourceFolder(String fileName) {
        try {
            File file = ResourceUtils.getFile("classpath:" + fileName);
            return Files.readAllBytes(file.toPath());
        } catch (Exception e) {
            try {
                File imageNotFound = ResourceUtils.getFile("classpath:404_photo.png");
                return Files.readAllBytes(imageNotFound.toPath());
            } catch (IOException ex) {
                log.error("Can't parse file path to byte[] !");
                return null;
            }
        }
    }

    public byte[] getMemeAuthorIconFromResourceFolder(String fileName) {
        try {
            File file = ResourceUtils.getFile("classpath:" + fileName);
            return Files.readAllBytes(file.toPath());
        } catch (Exception e) {
            try {
                File imageNotFound = ResourceUtils.getFile("classpath:profile-not-found.png");
                return Files.readAllBytes(imageNotFound.toPath());
            } catch (IOException ex) {
                log.error("Can't parse file path to byte[] !");
                return null;
            }
        }
    }

    @Override
    public void saveMultipartFileInResourceFolder(String fileName, MultipartFile multipartFile) {
        try {
            String resourcePath = ResourceUtils.getFile("classpath:").getAbsolutePath();
            File file = new File(resourcePath + "/" + fileName);
            if (!file.exists()) {
                file.mkdirs();
            }
            multipartFile.transferTo(file);
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
