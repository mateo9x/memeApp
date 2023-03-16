package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.dto.MemeDTO;
import com.mateo9x.memeapp.entity.Meme;
import com.mateo9x.memeapp.entity.User;
import com.mateo9x.memeapp.mapper.MemeMapper;
import com.mateo9x.memeapp.repository.MemeRepository;
import com.mateo9x.memeapp.service.FileService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.withSettings;

@ExtendWith(MockitoExtension.class)
public class MemeServiceImplTest {

    private static final Long MEME_ID = 1L;
    private static final String MEME_TITLE = "MEME_TITLE";
    private static final String MEME_PHOTO_URL = "MEME_PHOTO_URL";
    private static final LocalDateTime MEME_DATE_CREATED = LocalDateTime.of(2023,2,2,2,2);
    private static final Long MEME_AUTHOR_ID = 1L;

    @Mock
    private MemeRepository memeRepository;

    @Mock
    private MemeMapper memeMapper;

    @Mock
    private FileService fileService;

    private static final Random random = mock(Random.class, withSettings().withoutAnnotations());

    @InjectMocks MemeServiceImpl memeService;

    @Test
    public void shouldGetRandomMeme() {
        //when
        Meme meme = prepareMeme();
        when(memeRepository.findMaxIdFromMeme()).thenReturn(2L);
        when(random.nextLong(1L, 2L)).thenReturn(1L);
        when(memeRepository.findById(any())).thenReturn(Optional.of(meme));
        when(memeMapper.toDTO(meme)).thenReturn(prepareMemeDTO());

        //given
        MemeDTO memeDTO = memeService.getRandomMeme();

        //then
        Assertions.assertEquals(memeDTO.getId(), meme.getId());
    }

    private MemeDTO prepareMemeDTO() {
        MemeDTO memeDTO = new MemeDTO();
        memeDTO.setId(MEME_ID);
        memeDTO.setTitle(MEME_TITLE);
        memeDTO.setUrl(MEME_PHOTO_URL);
        memeDTO.setDateCreated(MEME_DATE_CREATED);
        memeDTO.setUserId(MEME_AUTHOR_ID);
        memeDTO.setUpVotes(0);
        return memeDTO;
    }

    private Meme prepareMeme() {
        Meme meme = new Meme();
        meme.setId(MEME_ID);
        meme.setTitle(MEME_TITLE);
        meme.setUrl(MEME_PHOTO_URL);
        meme.setDateCreated(MEME_DATE_CREATED);
        meme.setUser(new User());
        meme.setUpVotes(0);
        return meme;
    }
}
