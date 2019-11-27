package com.ziponia.server;

import com.ziponia.kakao.client.KakaoClient;
import com.ziponia.server.property.KakaoProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProviderConfig {

    @Autowired
    private KakaoProperty property;

    @Bean
    public KakaoClient kakaoClient() {
        return KakaoClient.builder()
                .setAdminKey(property.getAdminKey())
                .setRestKey(property.getRestKey())
                .build();
    }
}
