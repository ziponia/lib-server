package com.ziponia.server.controller;

import com.ziponia.google.youtube.request.SearchRequest;
import com.ziponia.google.youtube.response.SearchResponse;
import com.ziponia.server.service.google.YoutubeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GoogleController {

    @Autowired
    private YoutubeService youtubeService;

    @GetMapping(value = "/google/youtube")
    public ResponseEntity<SearchResponse> youtube(SearchRequest request) {
        SearchResponse model = youtubeService.search(request);
        return ResponseEntity.ok(model);
    }
}
