package com.mateo9x.memeapp.controller;

import com.mateo9x.memeapp.dto.MemeDTO;
import com.mateo9x.memeapp.service.MemeService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
public class MemeController {

    private final MemeService memeService;

    @GetMapping("/memes/{memeId}")
    public ResponseEntity<MemeDTO> getMemeById(@PathVariable Long memeId) {
        log.info("REST request to get meme by id: {}", memeId);
        return ResponseEntity.ok(memeService.getMemeById(memeId));
    }

    @GetMapping("/memes/random")
    public ResponseEntity<MemeDTO> getRandomMeme() {
        log.info("REST request to get random meme");
        return ResponseEntity.ok(memeService.getRandomMeme());
    }

    @GetMapping("/memes/approved")
    public ResponseEntity<List<MemeDTO>> getApprovedMemes() {
        log.info("REST request to get all approved memes");
        return ResponseEntity.ok(memeService.getApprovedMemes());
    }

    @GetMapping("/memes/pending")
    public ResponseEntity<List<MemeDTO>> getPendingMemes() {
        log.info("REST request to get all pending memes");
        return ResponseEntity.ok(memeService.getPendingMemes());
    }

    @GetMapping("/memes/user/{userId}")
    public ResponseEntity<List<MemeDTO>> getMemesForUser(@PathVariable Long userId) {
        log.info("REST request to get all memes for user: {}", userId);
        return ResponseEntity.ok(memeService.getMemesForUser(userId));
    }

    @GetMapping("/memes/tag/{tag}")
    public ResponseEntity<List<MemeDTO>> getMemesByTag(@PathVariable String tag) {
        log.info("REST request to get all memes by tag: {}", tag);
        return ResponseEntity.ok(memeService.getMemesByTag(tag));
    }

    @PutMapping("/memes")
    public ResponseEntity<MemeDTO> updateMeme(@RequestBody @Valid MemeDTO memeDTO) {
        log.info("REST request to update mem: {}", memeDTO);
        return ResponseEntity.ok(memeService.updateMeme(memeDTO));
    }
}
