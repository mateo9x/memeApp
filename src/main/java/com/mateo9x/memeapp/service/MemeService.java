package com.mateo9x.memeapp.service;

import com.mateo9x.memeapp.dto.MemeDTO;

import java.util.List;

public interface MemeService {

    List<MemeDTO> getApprovedMemes();

    List<MemeDTO> getPendingMemes();

    List<MemeDTO> getMemesForUser(Long userId);

    List<MemeDTO> getMemesByTag(String tag);

    MemeDTO updateMeme(MemeDTO memeDTO);

    MemeDTO getMemeById(Long memeId);

    MemeDTO getRandomMeme();

    MemeDTO createMeme(MemeDTO memeDTO);
}
