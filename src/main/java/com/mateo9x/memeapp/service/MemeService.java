package com.mateo9x.memeapp.service;

import com.mateo9x.memeapp.dto.MemeDTO;
import com.mateo9x.memeapp.model.MemePageable;

public interface MemeService {

    MemePageable getApprovedMemes(Integer pageSelected);

    MemePageable getPendingMemes(Integer pageSelected);

    MemePageable getMemesForUser(Long userId, Integer pageSelected);

    MemePageable getMemesByTag(String tag, Integer pageSelected);

    MemeDTO updateMeme(MemeDTO memeDTO);

    MemeDTO getMemeById(Long memeId);

    MemeDTO getRandomMeme();

    MemeDTO createMeme(MemeDTO memeDTO);
}
