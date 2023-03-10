package com.mateo9x.memeapp.mapper;

import com.mateo9x.memeapp.dto.MemeDTO;
import com.mateo9x.memeapp.entity.Meme;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface MemeMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.username", target = "userName")
    MemeDTO toDTO(Meme meme);

    @Mapping(source = "userId", target = "user")
    Meme toEntity(MemeDTO memeDTO);

    default Meme fromId(Long id) {
        if (id == null) {
            return null;
        }
        Meme meme = new Meme();
        meme.setId(id);
        return meme;
    }
}
