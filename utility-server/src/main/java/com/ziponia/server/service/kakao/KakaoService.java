package com.ziponia.server.service.kakao;

import com.ziponia.kakao.client.KakaoClient;
import com.ziponia.kakao.client.request.*;
import com.ziponia.kakao.client.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KakaoService {

    @Autowired
    private KakaoClient kakaoClient;

    public WebSearchResponse webSearch(WebSearchRequest request) {
        return kakaoClient.webSearch(request);
    }

    public AddressSearchResponse addressSearch(AddressSearchRequest request) {
        return kakaoClient.addressSearch(request);
    }

    public Coord2RegionResponse coord2Region(Coord2RegionRequest request) {
        return kakaoClient.coord2Region(request);
    }

    public TranslateResponse translate(TranslateRequest request) {
        return kakaoClient.translate(request);
    }

    public ThumbnailCropResponse thumbnail(ThumbnailCropRequest request) {
        return kakaoClient.thumbnailCrop(request);
    }
}
