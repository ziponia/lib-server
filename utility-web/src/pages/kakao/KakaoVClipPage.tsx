import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import { Input, List } from "antd";
import KakaoClient from "../../api/kakao";
import { AxiosError } from "axios";
import { useLocation, useHistory } from "react-router";
import qs from "query-string";
import styled from "styled-components";
import ReactJson from "react-json-view";
import { parseTimeToString, useEventListener } from "../../utils";
import moment from "moment-timezone";

type Props = PageProps & {};

const KakaoVClipPage: React.FC<Props> = props => {
  const location = useLocation();
  const history = useHistory();
  const parseQuery: any = qs.parse(location.search);

  const [q, setQuery] = useState(parseQuery.q);
  const [page, setPage] = useState(parseQuery.page || 1);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IKakaoVClipResponse | undefined>();
  const contentRef = useRef<HTMLDivElement>(null);

  const logHistory = () => {
    history.push({
      search: qs.stringify({
        q
      })
    });
  };

  useEffect(() => {
    if (q && q.length > 0) {
      callApi();
    } else {
      setData(undefined);
      history.push({
        search: undefined
      });
    }
  }, [location.search]);

  const scrollEventListener = () => {
    if (contentRef.current) {
      console.log("Listening Scroll Event");
      contentRef.current.addEventListener("scroll", scrollEventHandler);
    }

    return () => {
      if (contentRef.current) {
        console.log("Removing Scroll Event");
        contentRef.current.removeEventListener("scroll", scrollEventHandler);
      }
    };
  };

  const scrollEventHandler = (ev: any) => {
    const { offsetTop, scrollTop, clientHeight, scrollHeight } = ev.srcElement;
    if (scrollTop + clientHeight === scrollHeight) {
      callApi();
    }
  };

  useEventListener("scroll", scrollEventHandler, contentRef.current!);

  const callApi = async () => {
    setLoading(true);

    try {
      const { data: ajaxData } = await KakaoClient.vclip({
        query: q,
        page
      });

      if (!data) {
        setData(ajaxData);
      } else {
        const documents = data.documents.concat(ajaxData.documents);
        const meta = ajaxData.meta;
        setData({
          ...data,
          meta,
          documents
        });
      }

      setPage(page + 1);
      console.log(data);
    } catch (e) {
      const {}: AxiosError = e;
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout title={props.title} subTitle="by kakao">
      <Input.Search
        placeholder="검색어를 입력 해주세요..."
        size="large"
        onChange={e => setQuery(e.target.value)}
        style={{ display: "block", marginBottom: 20 }}
        enterButton
        onSearch={logHistory}
        loading={loading}
        disabled={loading}
        value={q}
      />
      <Content>
        <ContentChild ref={contentRef}>
          <List
            itemLayout="vertical"
            style={{ flex: 1, overflowY: "auto" }}
            dataSource={data && data.documents}
            loading={loading}
            renderItem={item => (
              <List.Item
                key={item.url}
                actions={[
                  <div>
                    <small style={{ marginRight: 10 }}>
                      등록&nbsp;
                      {moment(item.datetime).format("YYYY년 MM월 DD일 HH:mm")}
                    </small>
                    <small>
                      재생시간&nbsp;
                      {parseTimeToString(item.play_time)}
                    </small>
                  </div>
                ]}
                extra={
                  <a href={item.url} target="_blank" style={{ height: "100%" }}>
                    <img
                      alt="thumbnail"
                      width="100%"
                      height="100%"
                      style={{ objectFit: "contain" }}
                      src={item.thumbnail}
                    />
                  </a>
                }
              >
                <List.Item.Meta title={item.author} />
                {item.title}
              </List.Item>
            )}
          />
        </ContentChild>
        <ContentChild>
          <ReactJson src={data ? data : {}} style={{ flex: 1 }} />
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
  overflow-y: auto;
`;

export default KakaoVClipPage;
