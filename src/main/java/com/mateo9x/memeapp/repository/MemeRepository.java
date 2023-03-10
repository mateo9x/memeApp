package com.mateo9x.memeapp.repository;

import com.mateo9x.memeapp.entity.Meme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemeRepository extends JpaRepository<Meme, Long> {

    List<Meme> findAllByApprovedIsTrue();
}
