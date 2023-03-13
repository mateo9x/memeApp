package com.mateo9x.memeapp.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    byte[] getMemeFromResourceFolder(String fileName);

    void saveMultipartFileInResourceFolder(String fileName, MultipartFile multipartFile);
}
