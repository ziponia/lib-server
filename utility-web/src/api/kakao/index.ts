import httpClient from "../httpClient";

const KakaoClient = {
  webSearch: async (params: IKakaoWebSearchRequest) => {
    return httpClient.get<IKakaoWebSearchResponse>(`/kakao/web-search`, {
      params
    });
  },
  addressSearch: async (params: IKakaoAddressSearchRequest) => {
    return httpClient.get<IKakaoAddressSearchResponse>(
      `/kakao/address-search`,
      { params }
    );
  },
  coord2Region: async (params: IKakaoCoords2RegionRequest) => {
    return httpClient.get<IKakaoCoords2RegionResponse>(`/kakao/coord2Region`, {
      params
    });
  },
  translate: async (params: IKakaoTranslateRequest) => {
    return httpClient.get<any>(`/kakao/translate`, { params });
  },
  thumbnailCrop: async (params: IKakaoThumbnailCropRequest) => {
    const data = new FormData();
    data.append("width", params.width.toString());
    data.append("height", params.height.toString());

    if (!!params.image_url) {
      data.append("image_url", params.image_url);
    } else if (!!params.file) {
      data.append("file", params.file);
    }
    return httpClient.post<IKakaoThumbnailCropResponse>(
      `/kakao/thumbnail-crop`,
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );
  }
};

export default KakaoClient;
