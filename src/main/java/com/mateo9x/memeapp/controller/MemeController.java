package com.mateo9x.memeapp.controller;

import com.mateo9x.memeapp.dto.MemeDTO;
import com.mateo9x.memeapp.model.MemePageable;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

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
    public ResponseEntity<MemePageable> getApprovedMemes(@RequestParam(name = "page", required = false) Integer pageSelected) {
        log.info("REST request to get all approved memes");
        return ResponseEntity.ok(memeService.getApprovedMemes(pageSelected));
    }

    @GetMapping("/memes/pending")
    public ResponseEntity<MemePageable> getPendingMemes(@RequestParam(name = "page", required = false) Integer pageSelected) {
        log.info("REST request to get all pending memes");
        return ResponseEntity.ok(memeService.getPendingMemes(pageSelected));
    }

    @GetMapping("/memes/user/{userId}")
    public ResponseEntity<MemePageable> getMemesForUser(@PathVariable Long userId, @RequestParam(name = "page", required = false) Integer pageSelected) {
        log.info("REST request to get all memes for user: {}", userId);
        return ResponseEntity.ok(memeService.getMemesForUser(userId, pageSelected));
    }

    @GetMapping("/memes/tag/{tag}")
    public ResponseEntity<MemePageable> getMemesByTag(@PathVariable String tag, @RequestParam(name = "page", required = false) Integer pageSelected) {
        log.info("REST request to get all memes by tag: {}", tag);
        return ResponseEntity.ok(memeService.getMemesByTag(tag, pageSelected));
    }

    @PutMapping("/memes")
    public ResponseEntity<MemeDTO> updateMeme(@RequestBody @Valid MemeDTO memeDTO) {
        log.info("REST request to update mem: {}", memeDTO);
        return ResponseEntity.ok(memeService.updateMeme(memeDTO));
    }

    @PostMapping("/memes")
    public ResponseEntity<MemeDTO> createMeme(@RequestBody @Valid MemeDTO memeDTO) {
        log.info("REST request to create mem: {}", memeDTO);
        return ResponseEntity.ok(memeService.createMeme(memeDTO));
    }
}
