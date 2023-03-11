package com.mateo9x.memeapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "memes")
public class Meme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String title;
    @Column(name = "photo_url")
    private String photoUrl;
    @Column(name = "date_created")
    private LocalDateTime dateCreated;
    @Column(name = "date_approved")
    private LocalDateTime dateApproved;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "up_votes")
    private Integer upVotes;
    @Column(name = "down_votes")
    private Integer downVotes;
    @Column
    private Boolean approved;
    @Column
    private String tags;
}
