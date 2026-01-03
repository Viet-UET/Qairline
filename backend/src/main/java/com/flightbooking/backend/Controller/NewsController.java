package com.flightbooking.backend.Controller;

import com.flightbooking.backend.DTO.NewsRequestDTO;
import com.flightbooking.backend.Model.News;
import com.flightbooking.backend.Service.NewsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
@Tag(name = "News", description = "API quản lý tin tức")
public class NewsController {
    private final NewsService newsService;

    @Operation(summary = "Lấy tất cả tin tức", description = "Lấy tất cả các tin tức (bao gồm cả chưa đăng và đã đăng) - Chỉ dành cho Admin")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy danh sách thành công")
    })
    @GetMapping("/all")
    public ResponseEntity<List<News>> getAllNews() {
        return ResponseEntity.ok(newsService.getAllNews());
    }

    @Operation(summary = "Lấy tin tức đã đăng", description = "Lấy các tin tức đã được đăng công khai")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lấy danh sách thành công")
    })
    @GetMapping("/published")
    public ResponseEntity<List<News>> getPublishedNews() {
        return ResponseEntity.ok(newsService.getPublishedNews());
    }

    @Operation(summary = "Tạo tin tức mới", description = "Tạo một tin tức mới (chưa đăng) - Chỉ dành cho Admin")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Tạo tin tức thành công"),
            @ApiResponse(responseCode = "400", description = "Dữ liệu không hợp lệ"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
            @ApiResponse(responseCode = "403", description = "Không có quyền truy cập")
    })
    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<News> createNews(@Valid @RequestBody NewsRequestDTO request) {
        News news = newsService.createNews(request.getTitle(), request.getContent());
        return ResponseEntity.status(HttpStatus.CREATED).body(news);
    }

    @Operation(summary = "Cập nhật tin tức", description = "Cập nhật nội dung tin tức theo ID - Chỉ dành cho Admin")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Cập nhật thành công"),
            @ApiResponse(responseCode = "400", description = "Dữ liệu không hợp lệ"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
            @ApiResponse(responseCode = "403", description = "Không có quyền truy cập"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy tin tức")
    })
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<News> updateNews(
            @Parameter(description = "ID của tin tức cần cập nhật", required = true) @PathVariable Long id,
            @Valid @RequestBody NewsRequestDTO request) {
        News updatedNews = newsService.updateNews(id, request.getTitle(), request.getContent());
        return ResponseEntity.ok(updatedNews);
    }

    @Operation(summary = "Đăng tin tức", description = "Đăng công khai một tin tức theo ID - Chỉ dành cho Admin")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Đăng tin tức thành công"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
            @ApiResponse(responseCode = "403", description = "Không có quyền truy cập"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy tin tức")
    })
    @PutMapping("/{id}/publish")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<News> publishNews(
            @Parameter(description = "ID của tin tức cần đăng", required = true) @PathVariable Long id) {
        News publishedNews = newsService.publishNews(id);
        return ResponseEntity.ok(publishedNews);
    }

    @Operation(summary = "Xóa tin tức", description = "Xóa một tin tức theo ID - Chỉ dành cho Admin")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Xóa thành công"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
            @ApiResponse(responseCode = "403", description = "Không có quyền truy cập"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy tin tức")
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> deleteNews(
            @Parameter(description = "ID của tin tức cần xóa", required = true) @PathVariable Long id) {
        newsService.deleteNews(id);
        return ResponseEntity.ok("successfully");
    }

}