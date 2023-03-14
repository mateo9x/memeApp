package com.mateo9x.memeapp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "memes")
public class Meme {

    @Id
    @GeneratedValue(generator = "meme-sequence")
    @GenericGenerator(
            name = "meme-sequence",
            strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator",
            parameters = {
                    @Parameter(name = "sequence_name", value = "meme_sequence"),
                    @Parameter(name = "initial_value", value = "7"),
                    @Parameter(name = "increment_size", value = "1")
            }
    )
    private Long id;
    @Column
    private String title;
    @Column(name = "url")
    private String url;
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
    @Column(name = "is_video")
    private Boolean isVideo;
}
