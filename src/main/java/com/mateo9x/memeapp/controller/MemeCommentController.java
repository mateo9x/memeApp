package com.mateo9x.memeapp.controller;

import com.mateo9x.memeapp.dto.MemeCommentDTO;
import com.mateo9x.memeapp.dto.MemeDTO;
import com.mateo9x.memeapp.service.MemeCommentService;
import com.mateo9x.memeapp.service.MemeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class MemeCommentController {

    private final MemeCommentService memeCommentService;

    @GetMapping("/meme-comments/meme/{memeId}")
    public ResponseEntity<List<MemeCommentDTO>> getAllMemeCommentsByMemeById(@PathVariable Long memeId) {
        log.info("REST request to get all meme comments by meme id: {}", memeId);
        return ResponseEntity.ok(memeCommentService.getCommentsForMeme(memeId));
    }

    @PostMapping("/meme-comments")
    public ResponseEntity<MemeCommentDTO> saveMemeComment(@RequestBody @Valid MemeCommentDTO memeCommentDTO) {
        log.info("REST request to save meme comment : {}", memeCommentDTO);
        return ResponseEntity.ok(memeCommentService.saveComment(memeCommentDTO));
    }

    @PutMapping("/meme-comments")
    public ResponseEntity<MemeCommentDTO> updateMemeComment(@RequestBody @Valid MemeCommentDTO memeCommentDTO) {
        log.info("REST request to update meme comment : {}", memeCommentDTO);
        return ResponseEntity.ok(memeCommentService.saveComment(memeCommentDTO));
    }
}
