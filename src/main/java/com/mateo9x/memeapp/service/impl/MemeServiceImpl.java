package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.dto.MemeDTO;
import com.mateo9x.memeapp.entity.Meme;
import com.mateo9x.memeapp.mapper.MemeMapper;
import com.mateo9x.memeapp.model.MemePageable;
import com.mateo9x.memeapp.repository.MemeRepository;
import com.mateo9x.memeapp.service.FileService;
import com.mateo9x.memeapp.service.MemeService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class MemeServiceImpl implements MemeService {

    private static final Integer LIMIT_PER_PAGE = 5;

    private final MemeRepository memeRepository;
    private final MemeMapper memeMapper;
    private final FileService fileService;

    @Override
    public MemePageable getApprovedMemes(Integer pageSelected) {
        if (pageSelected == null) {
            pageSelected = 0;
        }
        Integer repoSize = memeRepository.findAllByApprovedIsTrue().size();

        List<MemeDTO> memeDTOList = memeRepository.findAllByApprovedIsTrue(preparePageable(pageSelected)).stream()
                .map(memeMapper::toDTO)
                .map(this::getFileForMeme)
                .map(this::getUserIconFileForMeme)
                .sorted(Comparator.comparing(MemeDTO::getDateApproved).reversed())
                .collect(Collectors.toList());

        return prepareMemePageable(memeDTOList, pageSelected, repoSize);
    }

    @Override
    public MemePageable getPendingMemes(Integer pageSelected) {
        if (pageSelected == null) {
            pageSelected = 0;
        }
        Integer repoSize = memeRepository.findAllByApprovedIsFalseOrApprovedIsNull().size();

        List<MemeDTO> memeDTOList = memeRepository.findAllByApprovedIsFalseOrApprovedIsNull(preparePageable(pageSelected)).stream()
                .map(memeMapper::toDTO)
                .map(this::getFileForMeme)
                .map(this::getUserIconFileForMeme)
                .sorted(Comparator.comparing(MemeDTO::getDateCreated).reversed())
                .collect(Collectors.toList());

        return prepareMemePageable(memeDTOList, pageSelected, repoSize);
    }

    @Override
    public MemePageable getMemesForUser(Long userId, Integer pageSelected) {
        if (pageSelected == null) {
            pageSelected = 0;
        }
        Integer repoSize = memeRepository.findAllByUserId(userId).size();

        List<MemeDTO> memeDTOList = memeRepository.findAllByUserId(userId, preparePageable(pageSelected)).stream()
                .map(memeMapper::toDTO)
                .map(this::getFileForMeme)
                .map(this::getUserIconFileForMeme)
                .sorted(Comparator.comparing(MemeDTO::getDateCreated).reversed())
                .collect(Collectors.toList());

        return prepareMemePageable(memeDTOList, pageSelected, repoSize);
    }

    @Override
    public MemePageable getMemesByTag(String tag, Integer pageSelected) {
        if (pageSelected == null) {
            pageSelected = 0;
        }
        Integer repoSize = memeRepository.findAllByTagsContaining(tag).size();

        List<MemeDTO> memeDTOList = memeRepository.findAllByTagsContaining(tag, preparePageable(pageSelected)).stream()
                .map(memeMapper::toDTO)
                .map(this::getFileForMeme)
                .map(this::getUserIconFileForMeme)
                .sorted(Comparator.comparing(MemeDTO::getDateCreated).reversed())
                .collect(Collectors.toList());

        return prepareMemePageable(memeDTOList, pageSelected, repoSize);
    }

    @Override
    public MemeDTO updateMeme(MemeDTO memeDTO) {
        Meme meme = memeMapper.toEntity(memeDTO);
        meme = memeRepository.save(meme);
        return memeMapper.toDTO(meme);
    }

    @Override
    public MemeDTO getMemeById(Long memeId) {
        return memeRepository.findById(memeId)
                .map(memeMapper::toDTO)
                .map(this::getFileForMeme)
                .map(this::getUserIconFileForMeme)
                .orElse(null);
    }

    @Override
    public MemeDTO getRandomMeme() {
        Long maxId = memeRepository.findMaxIdFromMeme();
        Random random = new Random();
        long userId = random.nextLong(1, maxId + 1);
        return memeRepository.findById(userId)
                .map(memeMapper::toDTO)
                .map(this::getFileForMeme)
                .map(this::getUserIconFileForMeme)
                .orElse(null);
    }

    @Override
    public MemeDTO createMeme(MemeDTO memeDTO) {
        long newId = memeRepository.findMaxIdFromMeme() + 1;
        String photoUrl = memeDTO.getUrl().replace("$REPLACE_MEM_ID", Long.toString(newId));
        memeDTO.setUrl(photoUrl);
        Meme meme = memeMapper.toEntity(memeDTO);
        meme = memeRepository.save(meme);
        return memeMapper.toDTO(meme);
    }

    private MemeDTO getFileForMeme(MemeDTO memeDTO) {
        memeDTO.setFile(fileService.getMemeFromResourceFolder(memeDTO.getUrl()));
        return memeDTO;
    }

    private MemeDTO getUserIconFileForMeme(MemeDTO memeDTO) {
        memeDTO.setUserIconFile(fileService.getMemeAuthorIconFromResourceFolder(memeDTO.getUserPhotoUrl()));
        return memeDTO;
    }

    private Pageable preparePageable(Integer pageSelected) {
        return PageRequest.of(pageSelected, LIMIT_PER_PAGE);
    }

    private MemePageable prepareMemePageable(List<MemeDTO> memeDTOList, Integer pageSelected, Integer repoSize) {
        return new MemePageable(memeDTOList, pageSelected + 1, repoSize);
    }
}
