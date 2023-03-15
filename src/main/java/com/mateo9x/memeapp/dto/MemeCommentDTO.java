package com.mateo9x.memeapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemeCommentDTO {
    private Long id;
    private String comment;
    private Long userId;
    private String userName;
    private String userPhotoUrl;
    private byte[] userPhotoFile;
    private Long memeId;
    private LocalDateTime dateCreated;
}


