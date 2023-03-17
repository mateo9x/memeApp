package com.mateo9x.memeapp.model;

import com.mateo9x.memeapp.dto.MemeDTO;

import java.util.List;

public record MemePageable(
        List<MemeDTO> memeDTOList,
        Integer pageSelected,
        Integer totalMemes) {
}
