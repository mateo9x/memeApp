package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.dto.MemeCommentDTO;
import com.mateo9x.memeapp.entity.MemeComment;
import com.mateo9x.memeapp.mapper.MemeCommentMapper;
import com.mateo9x.memeapp.repository.MemeCommentRepository;
import com.mateo9x.memeapp.service.FileService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class MemeCommentServiceImplTest {

    private static final Long MEME_ID = 1L;

    @Mock
    private MemeCommentRepository memeCommentRepository;

    @Mock
    private MemeCommentMapper memeCommentMapper;

    @Mock
    private FileService fileService;

    @InjectMocks
    private MemeCommentServiceImpl memeCommentService;


    @Test
    public void shouldGetCommentsForMeme() {
        //when
        when(memeCommentRepository.findAllByMemeId(MEME_ID)).thenReturn(List.of(prepareMemeComment()));
        when(memeCommentMapper.toDTO(any())).thenReturn(prepareMemeCommentDTO());

        //given
        List<MemeCommentDTO> memeCommentDTOList = memeCommentService.getCommentsForMeme(MEME_ID);

        //then
        Assertions.assertEquals(memeCommentDTOList.size(), 1);
    }

    private MemeComment prepareMemeComment() {
        MemeComment memeComment = new MemeComment();
        memeComment.setId(MEME_ID);
        return memeComment;
    }

    private MemeCommentDTO prepareMemeCommentDTO() {
        MemeCommentDTO memeCommentDTO = new MemeCommentDTO();
        memeCommentDTO.setId(MEME_ID);
        return memeCommentDTO;
    }

}
