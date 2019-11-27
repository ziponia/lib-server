interface IKakaoWebSearchRequest {
  query: string;
  page?: number;
}

interface IKakaoWebSearchResponse {
  meta: { totalCount: number; pageableCount: number; isEnd: boolean };
  documents: {
    title: string;
    contents: string;
    url: string;
    datetime: number;
  }[];
}

interface IKakaoAddressSearchRequest {
  query: string;
}

interface IKakaoAddressSearchResponse {
  meta: { totalCount: number; pageableCount: number; isEnd: boolean };
  documents: [
    {
      addressName: string;
      addressType: string;
      x: string;
      y: string;
      address: {
        addressName: string;
        region1depthName: string;
        region2depthName: string;
        region3depth_name: string;
        region3depthHNname: string;
        mountainYn: "N" | "Y";
        mainAddressNo: string;
        subAddressNo: string;
        zipCode: string;
        x: string;
        y: string;
        hcode: string;
        bcode: string;
      };
      roadAddress: {
        addressName: string;
        region1depthName: string;
        region2depthName: string;
        region3depthName: string;
        roadName: string;
        undergroundYn: string;
        mainBuildingNo: string;
        subBuildingNo: string;
        buildingName: string;
        zoneNo: string;
        x: string;
        y: string;
      };
    }
  ];
}

interface IKakaoCoords2RegionRequest {
  x: number;
  y: number;
}
interface IKakaoCoords2RegionResponse {}

type IKakaoTranslateLang =
  | "kr"
  | "en"
  | "jp"
  | "cn"
  | "vi"
  | "id"
  | "ar"
  | "bn"
  | "de"
  | "es"
  | "fr"
  | "hi"
  | "it"
  | "ms"
  | "nl"
  | "pt"
  | "ru"
  | "th"
  | "tr";

interface IKakaoTranslateRequest {
  query: string;
  src_lang: IKakaoTranslateLang;
  target_lang: IKakaoTranslateLang;
}

interface IKakaoThumbnailCropRequest {
  width: number;
  height: number;
  image_url?: string;
  file?: File;
}
interface IKakaoThumbnailCropResponse {
  thumbnail_image_url: string;
}
