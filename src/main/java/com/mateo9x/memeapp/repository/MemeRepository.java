package com.mateo9x.memeapp.repository;

import com.mateo9x.memeapp.entity.Meme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemeRepository extends JpaRepository<Meme, Long> {

    List<Meme> findAllByApprovedIsTrue();

    List<Meme> findAllByApprovedIsFalseOrApprovedIsNull();

    List<Meme> findAllByUserId(Long userId);

    List<Meme> findAllByTagsContaining(String tag);

    @Query ("select max(m.id) from Meme m")
    Long findMaxIdFromMeme();
}
