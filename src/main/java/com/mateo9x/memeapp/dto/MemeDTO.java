package com.mateo9x.memeapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemeDTO {

    private Long id;
    private String title;
    private String photoUrl;
    private LocalDateTime dateCreated;
    private LocalDateTime dateApproved;
    private Long userId;
    private String userName;
    private Integer upVotes;
    private Boolean approved;
    private List<String> tags;
}

