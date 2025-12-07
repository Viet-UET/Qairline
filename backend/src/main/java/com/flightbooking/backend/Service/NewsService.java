package com.flightbooking.backend.Service;

import com.flightbooking.backend.Exception.NewsAlreadyPublishedException;
import com.flightbooking.backend.Exception.NewsNotFoundException;
import com.flightbooking.backend.Model.News;
import com.flightbooking.backend.Repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsService {
    private final NewsRepository newsRepository;

    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    public List<News> getPublishedNews() {
        return newsRepository.findByStatus("PUBLISH");
    }

    @Transactional
    public News createNews(String title, String content) {
        News news = News.builder()
                .title(title)
                .content(content)
                .status("DRAFT")
                .build();
        return newsRepository.save(news);
    }

    @Transactional
    public News updateNews(Long id, String title, String content) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new NewsNotFoundException("News not found with id: " + id));

        news.setTitle(title);
        news.setContent(content);
        return newsRepository.save(news);
    }

    @Transactional
    public News publishNews(Long id) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new NewsNotFoundException("News not found with id: " + id));

        if ("PUBLISH".equals(news.getStatus())) {
            throw new NewsAlreadyPublishedException("News is already published");
        }

        news.setStatus("PUBLISH");
        return newsRepository.save(news);
    }

    @Transactional
    public void deleteNews(long id) {
        if (!newsRepository.existsById(id)) {
            throw new NewsNotFoundException("News not found with id: " + id);
        }
        newsRepository.deleteById(id);
    }

}
