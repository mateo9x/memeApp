package com.mateo9x.memeapp.repository;

import com.mateo9x.memeapp.entity.MemeComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemeCommentRepository extends JpaRepository<MemeComment, Long> {

    List<MemeComment> findAllByMemeId(Long memeId);
}
