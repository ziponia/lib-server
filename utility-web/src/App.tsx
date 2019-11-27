import React from "react";
import { Switch, Route } from "react-router";
import MainPage from "./pages/MainPage";

import KakaoWebSearchPage from "./pages/kakao/KakaoWebSearchPage";
import KakaoAddressPage from "./pages/kakao/KakaoAddressPage";
import KakaoCoord2RegionPage from "./pages/kakao/KakaoCoord2RegionPage";
import KakaoTranslatePage from "./pages/kakao/KakaoTranslatePage";
import KakaoThumbnailCrop from "./pages/kakao/KakaoThumbnailCrop";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path="/kakao/web-search" component={KakaoWebSearchPage} />
        <Route path="/kakao/address" component={KakaoAddressPage} />
        <Route path="/kakao/coord2Region" component={KakaoCoord2RegionPage} />
        <Route path="/kakao/translate" component={KakaoTranslatePage} />
        <Route path="/kakao/thumbnail-crop" component={KakaoThumbnailCrop} />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </>
  );
};

export default App;
