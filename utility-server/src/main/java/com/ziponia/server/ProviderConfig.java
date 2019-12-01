package com.ziponia.server;

import com.ziponia.google.maps.GoogleMapsClient;
import com.ziponia.google.youtube.YoutubeClient;
import com.ziponia.kakao.client.KakaoClient;
import com.ziponia.server.property.GoogleProperty;
import com.ziponia.server.property.KakaoProperty;
import com.ziponia.server.property.St11Property;
import com.ziponia.st11.St11Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProviderConfig {

    @Autowired
    private KakaoProperty kakaoProperty;

    @Autowired
    private St11Property st11Property;

    @Autowired
    private GoogleProperty googleProperty;

    @Bean
    public KakaoClient kakaoClient() {
        return KakaoClient.builder()
                .setAdminKey(kakaoProperty.getAdminKey())
                .setRestKey(kakaoProperty.getRestKey())
                .build();
    }

    @Bean
    public St11Client st11Client() {
        return St11Client.builder()
                .setApiKey(st11Property.getApiKey())
                .build();
    }

    @Bean
    public GoogleMapsClient googleMapsClient() {
        return GoogleMapsClient.builder()
                .apiKey(googleProperty.getApiKey())
                .build();
    }

    @Bean
    public YoutubeClient youtubeClient() {
        return YoutubeClient.builder()
                .apiKey(googleProperty.getApiKey())
                .build();
    }
}
