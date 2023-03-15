package com.mateo9x.memeapp.mapper;

import com.mateo9x.memeapp.dto.MemeCommentDTO;
import com.mateo9x.memeapp.entity.MemeComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMapper.class, MemeMapper.class})
public interface MemeCommentMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.username", target = "userName")
    @Mapping(source = "user.photoUrl", target = "userPhotoUrl")
    @Mapping(source = "meme.id", target = "memeId")
    MemeCommentDTO toDTO(MemeComment memeComment);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "memeId", target = "meme")
    MemeComment toEntity(MemeCommentDTO memeCommentDTO);

    default MemeComment fromId(Long id) {
        if (id == null) {
            return null;
        }
        MemeComment memeComment = new MemeComment();
        memeComment.setId(id);
        return memeComment;
    }
}

