package com.ziponia.server;

import com.ziponia.kakao.client.KakaoClient;
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
}
