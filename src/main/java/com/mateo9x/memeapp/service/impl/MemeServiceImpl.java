package com.mateo9x.memeapp.service.impl;

import com.mateo9x.memeapp.dto.MemeDTO;
import com.mateo9x.memeapp.entity.Meme;
import com.mateo9x.memeapp.mapper.MemeMapper;
import com.mateo9x.memeapp.repository.MemeRepository;
import com.mateo9x.memeapp.service.MemeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class MemeServiceImpl implements MemeService {

    private static final Integer MIN_UP_VOTES_TO_BE_APPROVED_MEME = 100;
    private final MemeRepository memeRepository;
    private final MemeMapper memeMapper;

    @Override
    public List<MemeDTO> getApprovedMemes() {
        return memeRepository.findAllByApprovedIsTrue().stream()
                .map(memeMapper::toDTO)
                .sorted(Comparator.comparing(MemeDTO::getDateApproved).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<MemeDTO> getPendingMemes() {
        return memeRepository.findAllByApprovedIsFalseOrApprovedIsNull().stream()
                .map(memeMapper::toDTO)
                .sorted(Comparator.comparing(MemeDTO::getDateCreated).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public List<MemeDTO> getMemesForUser(Long userId) {
        return memeRepository.findAllByUserId(userId).stream()
                .map(memeMapper::toDTO)
                .sorted(Comparator.comparing(MemeDTO::getDateCreated).reversed())
                .collect(Collectors.toList());
    }


    @Override
    public MemeDTO upVoteMem(MemeDTO memeDTO) {
        if (!Boolean.TRUE.equals(memeDTO.getApproved()) && memeDTO.getUpVotes() >= MIN_UP_VOTES_TO_BE_APPROVED_MEME) {
            memeDTO.setDateApproved(LocalDateTime.now());
            memeDTO.setApproved(true);
        }
        Meme meme = memeMapper.toEntity(memeDTO);
        meme = memeRepository.save(meme);
        return memeMapper.toDTO(meme);
    }
}
