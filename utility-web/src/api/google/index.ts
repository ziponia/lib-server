import httpClient from "../httpClient";

const GoogleClient = {
  youtubeSearch: async (params: IYoutubeSearchRequest) => {
    return httpClient.get<IYoutubeSearchResponse>(`/google/youtube`, {
      params
    });
  }
};

export default GoogleClient;
