package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.NewsRequestDTO;
import com.flightbooking.backend.Model.News;
import com.flightbooking.backend.Service.NewsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private final NewsService newsService;

    @GetMapping("/all")
    public ResponseEntity<List<News>> getAllNews() {
        return ResponseEntity.ok(newsService.getAllNews());
    }

    @GetMapping("/published")
    public ResponseEntity<List<News>> getPublishedNews() {
        return ResponseEntity.ok(newsService.getPublishedNews());
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<News> createNews(@Valid @RequestBody NewsRequestDTO request) {
        News news = newsService.createNews(request.getTitle(), request.getContent());
        return ResponseEntity.status(HttpStatus.CREATED).body(news);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<News> updateNews(@PathVariable Long id,
            @Valid @RequestBody NewsRequestDTO request) {
        News updatedNews = newsService.updateNews(id, request.getTitle(), request.getContent());
        return ResponseEntity.ok(updatedNews);
    }

    @PutMapping("/{id}/publish")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<News> publishNews(@PathVariable Long id) {
        News publishedNews = newsService.publishNews(id);
        return ResponseEntity.ok(publishedNews);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> deleteNews(@PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.ok("successfully");
    }

}