package com.ziponia.server.service.google;

import com.ziponia.google.youtube.YoutubeClient;
import com.ziponia.google.youtube.request.SearchRequest;
import com.ziponia.google.youtube.response.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class YoutubeService {

    @Autowired
    private YoutubeClient youtubeClient;

    public SearchResponse search(SearchRequest request) {
        return youtubeClient.search(request);
    }
}
