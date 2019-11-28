import KakaoWebSearchPage from "./pages/kakao/KakaoWebSearchPage";
import KakaoAddressPage from "./pages/kakao/KakaoAddressPage";
import KakaoCoord2RegionPage from "./pages/kakao/KakaoCoord2RegionPage";
import KakaoTranslatePage from "./pages/kakao/KakaoTranslatePage";
import KakaoThumbnailCrop from "./pages/kakao/KakaoThumbnailCrop";
import { FunctionComponent } from "react";
import MainPage from "./pages/MainPage";
import KakaoVClipPage from "./pages/kakao/KakaoVClipPage";

export type RouteNavigationProps = {
  key: string;
  title: string;
  component?: FunctionComponent<any>;
  children?: RouteNavigationProps;
  exact?: boolean;
}[];

export const routes: RouteNavigationProps = [
  {
    key: "/",
    title: "홈",
    component: MainPage,
    exact: true
  },
  {
    key: "/kakao",
    title: "kakao",
    children: [
      {
        key: "/web-search",
        title: "웹 서치",
        component: KakaoWebSearchPage
      },
      {
        key: "/address",
        title: "주소 검색",
        component: KakaoAddressPage
      },
      {
        key: "/coord2Region",
        title: "좌표 -> 행정구역정보 변환",
        component: KakaoCoord2RegionPage
      },
      {
        key: "/translate",
        title: "번역",
        component: KakaoTranslatePage
      },
      {
        key: "/thumbnail-crop",
        title: "썸네일 추출",
        component: KakaoThumbnailCrop
      },
      {
        key: "/vclip",
        title: "동영상 검색",
        component: KakaoVClipPage
      }
    ]
  }
];
