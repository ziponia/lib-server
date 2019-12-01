interface IYoutubeSearchRequest {
  part: "SNIPPET" | "ID";
  forMine?: boolean;
  forContentOwner?: boolean;
  relatedToVideoId?: boolean;
  channelId?: boolean;
  channelType?: "ANY" | "SHOW";
  eventType?: "COMPLETED" | "LIVE" | "UPCOMING";
  maxResults?: number;
  onBehalfOfContentOwner?: string;
  order?:
    | "DATE"
    | "RATING"
    | "RELEVANCE"
    | "TITLE"
    | "VIDEO_COUNT"
    | "VIEW_COUNT";
  pageToken?: string;
  publishedAfter?: Date;
  publishedBefore?: Date;
  q?: string;
  regionCode?: string;
  safeSearch?: "MODERATE" | "NONE" | "STRICT";
  topicId?: string;
  type?: ("CHANNEL" | "PLAYLIST" | "VIDEO")[];
  videoCaption?: "ANY" | "CLOSED_CAPTION" | "NONE";
  videoCategoryId?: string;
  videoDefinition?: "ANY" | "HIGH" | "STANDARD";
  videoDimension?: "_2D" | "_3D" | "ANY";
  videoDuration?: "ANY" | "LONG" | "MEDIUM" | "SHORT";
  videoEmbeddable?: "ANY" | "TRUE";
  videoLicense?: "ANY" | "CREATIVE_COMMON" | "YOUTUBE";
  videoSyndicated?: "ANY" | "TRUE";
  videoType?: "ANY" | "EPISODE" | "MOVIE";
}

interface IYoutubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: {
    kind: string;
    etag: string;
    id: { kind: string };
    snippet: {
      publishedAt: Date;
      channelId: string;
      title: string;
      description: string;
      channelTitle: string;
      liveBroadcastContent: string;
      thumbnails: {
        default: {
          url: string;
        };
        medium: {
          url: string;
        };
        high: {
          url: string;
        };
      };
    };
  }[];
}
