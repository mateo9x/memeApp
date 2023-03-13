package com.mateo9x.memeapp.controller;

import com.mateo9x.memeapp.service.FileService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class FileController {

    private final FileService fileService;

    @PostMapping("/files")
    public void saveFile(@RequestPart("fileName") String fileName, @RequestPart("file") MultipartFile file) {
        fileService.saveMultipartFileInResourceFolder(fileName, file);
    }
}
