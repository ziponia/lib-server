import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import GoogleMapViewer from "../../components/googlemap/GoogleMapViewer";
import Marker from "../../components/googlemap/Marker";
import styled from "styled-components";
import ReactJson from "react-json-view";
import { ClickEventValue } from "google-map-react";
import KakaoClient from "../../api/kakao";

type Props = {};

const KakaoCoord2RegionPage: React.FC<Props> = props => {
  const [data, setData] = useState({});
  const [latLng, setLatLng] = useState<{ lat: number; lng: number }>();

  const mapClickHandler = async (e: ClickEventValue) => {
    setLatLng({
      lat: e.lat,
      lng: e.lng
    });
    const { data } = await KakaoClient.coord2Region({
      x: e.lng,
      y: e.lat
    });

    setData(data);
  };

  return (
    <Layout title="좌표 -> 행정구역정보 변환" subTitle="by kakao">
      <Content>
        <ContentChild>
          <GoogleMapViewer onClick={mapClickHandler}>
            {!!latLng && <Marker lat={latLng.lat} lng={latLng.lng} />}
          </GoogleMapViewer>
        </ContentChild>
        <ContentChild>
          {data && <ReactJson src={data} style={{ flex: 1 }} />}
        </ContentChild>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const ContentChild = styled.div`
  flex: 1;
  padding: 20px;
`;

export default KakaoCoord2RegionPage;
