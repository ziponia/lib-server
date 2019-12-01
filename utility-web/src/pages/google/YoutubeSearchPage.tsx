import React, { useState, useEffect, useRef } from "react";
import Layout from "../../components/layout/Layout";
import { useLocation, useHistory } from "react-router";
import qs from "query-string";
import ReactJson from "react-json-view";
import GoogleClient from "../../api/google";
import { Input, List, Card, Modal } from "antd";
import styled from "styled-components";
import { useEventListener } from "../../utils";
import moment from "moment";
import ReactYoutube from "react-youtube";

import "moment/locale/ko";

moment.locale("ko");

type Props = PageProps & {};

const YoutubeSearchPage: React.FC<Props> = props => {
  const location = useLocation();
  const history = useHistory();
  const parseQuery: any = qs.parse(location.search);
  const [q, setQuery] = useState(parseQuery.q);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IYoutubeSearchResponse>();
  const [pageToken, setPageToken] = useState<string>();
  const [modal, setModal] = useState();

  const contentRef = useRef<HTMLDivElement>(null);

  const scrollEventHandler = (ev: any) => {
    const { offsetTop, scrollTop, clientHeight, scrollHeight } = ev.srcElement;
    if (scrollTop + clientHeight === scrollHeight) {
      callApi();
    }
  };

  useEventListener("scroll", scrollEventHandler, contentRef.current!);

  useEffect(() => {
    if (!q || q.length === 0) {
      callApi();
    } else if (q && q.length > 0) {
      callApi();
    } else {
      setData(undefined);
      history.push({
        search: undefined
      });
    }
  }, [location.search]);

  const callApi = async () => {
    setLoading(true);
    try {
      const { data: ajaxData } = await GoogleClient.youtubeSearch({
        q,
        part: "SNIPPET",
        order: "DATE",
        pageToken
      });

      if (!data) {
        setData(ajaxData);
      } else {
        const { nextPageToken, items } = ajaxData;
        setPageToken(nextPageToken);
        setData({
          ...data,
          nextPageToken,
          items: data.items.concat(items)
        });
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const keywordChangeHandler = () => {
    const newQuery = {
      ...qs.parse(location.search),
      pageNum: undefined,
      q
    };

    history.push({
      search: qs.stringify(newQuery)
    });
  };

  const _onReady = (event: any) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const showPlayer = (videoId?: string) => {
    if (videoId && videoId.length > 0) {
      Modal.info({
        icon: null,
        centered: true,
        content: (
          <ReactYoutube
            videoId={videoId}
            opts={{}}
            onReady={_onReady}
            onError={e => console.log(e)}
          />
        ),
        okText: "닫기"
      });
    }
  };

  return (
    <Layout title={props.title} subTitle="by Google">
      <Input.Search
        placeholder="검색어를 입력 해주세요..."
        size="large"
        onChange={e => setQuery(e.target.value)}
        style={{ display: "block", marginBottom: 20 }}
        enterButton
        onSearch={keywordChangeHandler}
        loading={loading}
        disabled={loading}
        value={q}
      />
      <Content>
        <ContentChild ref={contentRef} style={{ width: 480 }}>
          <List
            itemLayout="vertical"
            style={{ flex: 1, overflowY: "auto" }}
            dataSource={data && data.items}
            loading={loading}
            renderItem={item => (
              <List.Item>
                <Card
                  style={{ width: 480 }}
                  cover={
                    <div
                      style={{ width: 480 }}
                      onClick={() => showPlayer(item.snippet.channelId)}
                    >
                      <img
                        alt="example"
                        src={item.snippet.thumbnails.high.url}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={
                      <>
                        <small style={{ display: "block" }}>
                          {moment(item.snippet.publishedAt).fromNow()}
                        </small>
                        <span>{item.snippet.title}</span>
                      </>
                    }
                    description={item.snippet.description}
                  />
                </Card>
              </List.Item>
            )}
          />
        </ContentChild>
        <ContentChild>
          <ReactJson src={data || {}} />
        </ContentChild>
      </Content>
      <Modal
        title="Basic Modal"
        visible={!!modal}
        onOk={() => showPlayer()}
        onCancel={() => null}
        maskClosable={false}
        centered
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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

export default YoutubeSearchPage;
