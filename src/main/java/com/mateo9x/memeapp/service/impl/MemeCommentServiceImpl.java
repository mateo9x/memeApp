package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.dto.MemeCommentDTO;
import com.mateo9x.memeapp.entity.MemeComment;
import com.mateo9x.memeapp.mapper.MemeCommentMapper;
import com.mateo9x.memeapp.repository.MemeCommentRepository;
import com.mateo9x.memeapp.service.FileService;
import com.mateo9x.memeapp.service.MemeCommentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MemeCommentServiceImpl implements MemeCommentService {

    private final MemeCommentRepository memeCommentRepository;
    private final MemeCommentMapper memeCommentMapper;
    private final FileService fileService;

    @Override
    public MemeCommentDTO saveComment(MemeCommentDTO memeCommentDTO) {
        MemeComment memeComment = memeCommentMapper.toEntity(memeCommentDTO);
        memeComment = memeCommentRepository.save(memeComment);
        return memeCommentMapper.toDTO(memeComment);
    }

    @Override
    public List<MemeCommentDTO> getCommentsForMeme(Long memeId) {
        return memeCommentRepository.findAllByMemeId(memeId).stream()
                .map(memeCommentMapper::toDTO)
                .map(this::getUserPhotoFile)
                .collect(Collectors.toList());
    }

    MemeCommentDTO getUserPhotoFile(MemeCommentDTO memeCommentDTO) {
        memeCommentDTO.setUserPhotoFile(fileService.getMemeAuthorIconFromResourceFolder(memeCommentDTO.getUserPhotoUrl()));
        return memeCommentDTO;
    }
}
