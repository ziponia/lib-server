import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Input, Row, Col, Select } from "antd";
import styled from "styled-components";
import ReactJson from "react-json-view";
import KakaoClient from "../../api/kakao";
import KakaoTranlateSelect from "../../components/kakao/KakaoTranslateSelect";
import { IoIosArrowRoundForward } from "react-icons/io";

const { TextArea } = Input;

type Props = {};

let timer: any = null;

const KakaoTranslatePage: React.FC<Props> = props => {
  const [data, setData] = useState({});
  const [text, setText] = useState("");
  const [srcLang, setSrcLang] = useState<IKakaoTranslateLang>("en");
  const [targetLang, setTargetLang] = useState<IKakaoTranslateLang>("kr");

  useEffect(() => {
    if (text.length > 0 && srcLang !== targetLang) {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }

      timer = setTimeout(() => callApi(), 500);
    } else {
      setData({});
    }
  }, [text, srcLang, targetLang]);

  const callApi = async () => {
    const { data } = await KakaoClient.translate({
      query: text,
      src_lang: srcLang,
      target_lang: targetLang
    });
    setData(data);
  };

  return (
    <Layout title="번역" subTitle="by kakao">
      <Row style={{ padding: 20, boxSizing: "border-box" }}>
        <Col span={4} style={{ display: "flex", alignItems: "center" }}>
          <KakaoTranlateSelect value={srcLang} onChange={e => setSrcLang(e)} />
          <IoIosArrowRoundForward size={24} style={{ margin: "0 5px" }} />
          <KakaoTranlateSelect
            value={targetLang}
            onChange={e => setTargetLang(e)}
          />
        </Col>
      </Row>
      <Content>
        <ContentChild>
          <TextArea
            style={{ height: "100%" }}
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </ContentChild>
        <ContentChild>
          <ReactJson src={data} style={{ flex: 1 }} />
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

export default KakaoTranslatePage;
