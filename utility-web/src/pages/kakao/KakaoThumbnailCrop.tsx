import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Upload, Icon, message, Input, Result, Button, Empty } from "antd";
import KakaoClient from "../../api/kakao";
import ReactJson from "react-json-view";
import { AxiosError } from "axios";
import styled from "styled-components";

const { Dragger } = Upload;

type Props = PageProps & {};

const KakaoThumbnailCrop: React.FC<Props> = props => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ thumbnail_image_url?: string }>({});

  const onThumbnailClickHandler = async () => {
    setLoading(true);
    try {
      const { data } = await KakaoClient.thumbnailCrop({
        width: 400,
        height: 400,
        image_url: imageUrl
      });
      setData(data);
    } catch (e) {
      const err: AxiosError<any> = e;
      message.error(err.response!.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title={props.title} subTitle="by kakao">
      <Input.Search
        size="large"
        placeholder="이곳에 이미지 URL 을 붙혀 넣으세요..."
        onSearch={() => onThumbnailClickHandler()}
        onChange={e => setImageUrl(e.target.value)}
        value={imageUrl}
        loading={loading}
        style={{ marginBottom: 20 }}
      />

      <Content>
        <ContentChild>
          <ReactJson src={data} style={{ flex: 1 }} />
        </ContentChild>
        <ContentChild>
          <Empty
            image={data.thumbnail_image_url}
            imageStyle={{
              width: 400,
              height: 400
            }}
          />
        </ContentChild>
      </Content>
    </Layout>
  );
};

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const ContentChild = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
`;

export default KakaoThumbnailCrop;
