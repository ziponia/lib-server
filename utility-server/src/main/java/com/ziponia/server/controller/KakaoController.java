package com.ziponia.server.controller;

import com.ziponia.kakao.client.exception.KakaoClientBadRequestException;
import com.ziponia.kakao.client.request.*;
import com.ziponia.kakao.client.response.*;
import com.ziponia.server.service.kakao.KakaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;

@RestController
public class KakaoController {

    @Autowired
    private KakaoService kakaoService;

    @GetMapping(value = "/kakao/web-search")
    public ResponseEntity<WebSearchResponse> webSearch(
            WebSearchRequest request
    ) {
        WebSearchResponse model = kakaoService.webSearch(request);
        return ResponseEntity.ok(model);
    }

    @GetMapping(value = "/kakao/address-search")
    public ResponseEntity<AddressSearchResponse> addressSearch(
            AddressSearchRequest request
    ) {
        AddressSearchResponse model = kakaoService.addressSearch(request);
        return ResponseEntity.ok(model);
    }

    @GetMapping(value = "/kakao/coord2Region")
    public ResponseEntity<Coord2RegionResponse> coord2Region(
            Coord2RegionRequest request
    ) {
        Coord2RegionResponse model = kakaoService.coord2Region(request);
        return ResponseEntity.ok(model);
    }

    @GetMapping(value = "/kakao/translate")
    public ResponseEntity<TranslateResponse> translate(TranslateRequest request) {
        TranslateResponse model = kakaoService.translate(request);
        return ResponseEntity.ok(model);
    }

    @PostMapping(value = "/kakao/thumbnail-crop")
    public ResponseEntity<ThumbnailCropResponse> thumbnail(
            @RequestParam Integer width,
            @RequestParam Integer height,
            @RequestParam(required = false) String image_url,
            MultipartFile file
    ) throws IOException {
        File fs = null;
        ThumbnailCropRequest.ThumbnailCropRequestBuilder builder =
                ThumbnailCropRequest.builder()
                .width(width)
                .height(height);

        if (image_url != null) {
            builder.image_url(image_url);
        } else if (file.getSize() > 0) {
            fs = File.createTempFile(Objects.requireNonNull(file.getOriginalFilename()), "");
            file.transferTo(fs);
            builder.file(fs);
        } else {
            throw new KakaoClientBadRequestException("file 과 image_url 중 하나는 필수 입니다.");
        }

        ThumbnailCropResponse model = kakaoService.thumbnail(builder.build());

        if (fs != null) {
            boolean deleted = fs.delete();
            if (!deleted) fs.deleteOnExit();
        }
        return ResponseEntity.ok(model);
    }
}
