package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.dto.MemeDTO;
import com.mateo9x.memeapp.entity.Meme;
import com.mateo9x.memeapp.entity.User;
import com.mateo9x.memeapp.mapper.MemeMapper;
import com.mateo9x.memeapp.repository.MemeRepository;
import io.jsonwebtoken.lang.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.openMocks;

@ExtendWith(MockitoExtension.class)
public class MemeServiceImplTest {

    private static final Long MEME_ID = 1L;
    private static final String MEME_TITLE = "MEME_TITLE";
    private static final String MEME_PHOTO_URL = "MEME_PHOTO_URL";
    private static final LocalDateTime MEME_DATE_CREATED = LocalDateTime.of(2023,2,2,2,2);
    private static final Long MEME_AUTHOR_ID = 1L;

    @BeforeEach
    void setUp() {
        openMocks(this);
    }

    @Mock
    private MemeRepository memeRepository;

    @Mock
    private MemeMapper memeMapper;

    @InjectMocks MemeServiceImpl memeService;

    @Test
    public void shouldUpVoteMemAndChangeMemToBeApproved() {
        //when
        MemeDTO memeDTO = prepareMemeDTO();
        memeDTO.setUpVotes(100);
        when(memeMapper.toEntity(any())).thenReturn(prepareMeme());
        when(memeRepository.save(any())).thenReturn(prepareMeme());
        //given
        MemeDTO memeSaved = memeService.upVoteMem(memeDTO);

        //then
        Assert.isTrue(memeSaved.getApproved());
    }

    private MemeDTO prepareMemeDTO() {
        MemeDTO memeDTO = new MemeDTO();
        memeDTO.setId(MEME_ID);
        memeDTO.setTitle(MEME_TITLE);
        memeDTO.setPhotoUrl(MEME_PHOTO_URL);
        memeDTO.setDateCreated(MEME_DATE_CREATED);
        memeDTO.setUserId(MEME_AUTHOR_ID);
        memeDTO.setUpVotes(0);
        return memeDTO;
    }

    private Meme prepareMeme() {
        Meme meme = new Meme();
        meme.setId(MEME_ID);
        meme.setTitle(MEME_TITLE);
        meme.setPhotoUrl(MEME_PHOTO_URL);
        meme.setDateCreated(MEME_DATE_CREATED);
        meme.setUser(new User());
        meme.setUpVotes(0);
        return meme;
    }
}
