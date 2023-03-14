package com.mateo9x.memeapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemeDTO {

    private Long id;
    private String title;
    private String url;
    private LocalDateTime dateCreated;
    private LocalDateTime dateApproved;
    private Long userId;
    private String userName;
    private String userPhotoUrl;
    private Integer upVotes;
    private Integer downVotes;
    private Boolean approved;
    private String tags;
    private byte[] file;
    private Boolean isVideo;
}

