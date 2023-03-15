package com.mateo9x.memeapp.service;

import com.mateo9x.memeapp.dto.MemeCommentDTO;

import java.util.List;

public interface MemeCommentService {

    MemeCommentDTO saveComment(MemeCommentDTO memeCommentDTO);

    List<MemeCommentDTO> getCommentsForMeme(Long memeId);
}
